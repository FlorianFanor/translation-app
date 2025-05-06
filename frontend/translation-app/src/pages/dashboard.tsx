import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface Language {
    id: number;
    code: string;
    name: string;
}

interface Environment {
    id: number;
    name: string;
    languages: Language[];
}

interface Translation {
    key: string;
    translation: string;
}

const mockEnvironments: Environment[] = [
    {
        id: 1,
        name: 'Production',
        languages: [
            { id: 1, code: 'en', name: 'English' },
            { id: 2, code: 'fr', name: 'French' },
        ],
    },
    {
        id: 2,
        name: 'Staging',
        languages: [
            { id: 3, code: 'en', name: 'English' },
            { id: 4, code: 'es', name: 'Spanish' },
        ],
    },
];

const generateMockTranslations = (lang: string): Translation[] => {
    return Array.from({ length: 100 }, (_, i) => {
        const key = `key_${i}`;
        return {
            key,
            translation: `Translated ${lang} -> ${key} `,
        };
    });
};

const mockTranslations: { [key: string]: Translation[] } = {
    '1_en': generateMockTranslations('en'),
    '1_fr': generateMockTranslations("fr"),
    '2_en': generateMockTranslations('en'),
    '2_es': generateMockTranslations('es'),
};


const DashboardPage = () => {
    const [environments, setEnvironments] = useState<Environment[]>([]);
    const [selectedEnvId, setSelectedEnvId] = useState<number | null>(null);
    const [languages, setLanguages] = useState<Language[]>([]);
    const [selectedLanguageCode, setSelectedLanguageCode] = useState<string>('');
    const [translations, setTranslations] = useState<Translation[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editKey, setEditKey] = useState('');
    const [editTranslation, setEditTranslation] = useState('');
    const [filterText, setFilterText] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        setEnvironments(mockEnvironments);

        const firstEnv = mockEnvironments[0];
        setSelectedEnvId(firstEnv.id);
        setLanguages(firstEnv.languages);

        const firstLang = firstEnv.languages[0];
        setSelectedLanguageCode(firstLang.code);

        const key = `${firstEnv.id}_${firstLang.code}`;
        setTranslations(mockTranslations[key] || []);
    }, []);

    const handleEnvironmentSelect = (env: Environment) => {
        setSelectedEnvId(env.id);
        setLanguages(env.languages);
        const defaultLang = env.languages[0];
        setSelectedLanguageCode(defaultLang.code);
        const key = `${env.id}_${defaultLang.code}`;
        setTranslations(mockTranslations[key] || []);
    };

    const applyLanguageChange = () => {
        if (!selectedEnvId || !selectedLanguageCode) return;
        const key = `${selectedEnvId}_${selectedLanguageCode}`;
        setTranslations(mockTranslations[key] || []);
    };

    const filteredTranslations = translations
        .filter((t) =>
            t.key.toLowerCase().includes(filterText.toLowerCase()) ||
            t.translation.toLowerCase().includes(filterText.toLowerCase())
        )
        .sort((a, b) => {
            const fieldA = a.key.toLowerCase();
            const fieldB = b.key.toLowerCase();
            if (sortOrder === 'asc') return fieldA.localeCompare(fieldB);
            else return fieldB.localeCompare(fieldA);
        });

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-4">
                <h2 className="text-lg font-semibold mb-4">Environments</h2>
                <ul className="space-y-2">
                    {environments.map((env) => (
                        <li key={env.id}>
                            <Button
                                variant={selectedEnvId === env.id ? 'default' : 'outline'}
                                className={`w-full justify-start ${selectedEnvId === env.id
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'text-gray-800'
                                    }`}
                                onClick={() => handleEnvironmentSelect(env)}
                            >
                                {env.name}
                            </Button>
                        </li>
                    ))}
                </ul>
            </aside>


            {/* Main Content */}
            <main className="flex-1 p-6">
                <div className="flex items-center gap-4 mb-6">
                    <Select
                        value={selectedLanguageCode}
                        onValueChange={(value) => setSelectedLanguageCode(value)}
                    >
                        <SelectTrigger className="w-64">
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                            {languages.map((lang) => (
                                <SelectItem key={lang.id} value={lang.code}>
                                    {lang.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button onClick={applyLanguageChange}>Apply</Button>
                </div>
                <div className="flex items-center gap-4 mb-4">
                    <Input
                        placeholder="Filter by key or value"
                        className="w-full max-w-md"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                    <Button
                        variant="outline"
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    >
                        Sort: {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
                    </Button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4">Translations</h3>
                    {translations.length === 0 ? (
                        <p className="text-gray-500">No translations available.</p>
                    ) : (
                        <div className="space-y-4">
                            {filteredTranslations.map((t, idx) => (
                                <div key={idx} className="flex items-center gap-4">
                                    {editingIndex === idx ? (
                                        <>
                                            <div className="flex-1">
                                                <Label className='mb-2'>Key</Label>
                                                <Input value={editKey} onChange={(e) => setEditKey(e.target.value)} />
                                            </div>
                                            <div className="flex-1">
                                                <Label className='mb-2'>Translation</Label>
                                                <Input
                                                    value={editTranslation}
                                                    onChange={(e) => setEditTranslation(e.target.value)}
                                                />
                                            </div>
                                            <div className="flex-shrink-0 space-x-2">
                                                <Button
                                                    variant="default"
                                                    onClick={() => {
                                                        const updated = [...translations];
                                                        updated[idx] = { key: editKey, translation: editTranslation };
                                                        setTranslations(updated);
                                                        setEditingIndex(null);
                                                    }}
                                                >
                                                    Save
                                                </Button>
                                                <Button variant="outline" onClick={() => setEditingIndex(null)}>
                                                    Cancel
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex-1 font-mono">{t.key}</div>
                                            <div className="flex-1">{t.translation}</div>
                                            <div className="flex-shrink-0">
                                                <Button
                                                    variant="secondary"
                                                    onClick={() => {
                                                        setEditingIndex(idx);
                                                        setEditKey(t.key);
                                                        setEditTranslation(t.translation);
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;

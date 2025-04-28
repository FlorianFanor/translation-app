import { useEffect, useState } from 'react';

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

const mockTranslations: { [key: string]: Translation[] } = {
    '1_en': [
        { key: 'hello', translation: 'Hello' },
        { key: 'goodbye', translation: 'Goodbye' },
    ],
    '1_fr': [
        { key: 'hello', translation: 'Bonjour' },
        { key: 'goodbye', translation: 'Au revoir' },
    ],
    '2_en': [
        { key: 'welcome', translation: 'Welcome' },
        { key: 'logout', translation: 'Logout' },
    ],
    '2_es': [
        { key: 'welcome', translation: 'Bienvenido' },
        { key: 'logout', translation: 'Cerrar sesión' },
    ],
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

    // Load mock data on mount
    useEffect(() => {
        setEnvironments(mockEnvironments);

        if (mockEnvironments.length > 0) {
            const firstEnv = mockEnvironments[0];
            setSelectedEnvId(firstEnv.id);
            setLanguages(firstEnv.languages);

            if (firstEnv.languages.length > 0) {
                const firstLang = firstEnv.languages[0].code;
                setSelectedLanguageCode(firstLang);

                const key = `${firstEnv.id}_${firstLang}`;
                setTranslations(mockTranslations[key] || []);
            }
        }
    }, []);

    const applyLanguageChange = () => {
        if (!selectedEnvId || !selectedLanguageCode) return;

        const key = `${selectedEnvId}_${selectedLanguageCode}`;
        setTranslations(mockTranslations[key] || []);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar for Environments */}
            <aside className="w-64 bg-white shadow-md p-4">
                <h2 className="text-xl font-bold mb-4">Environments</h2>
                <ul className="space-y-2">
                    {environments.map((env) => (
                        <li
                            key={env.id}
                            className={`p-2 rounded cursor-pointer ${selectedEnvId === env.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                                }`}
                            onClick={() => {
                                setSelectedEnvId(env.id);
                                setLanguages(env.languages);
                                if (env.languages.length > 0) {
                                    setSelectedLanguageCode(env.languages[0].code);
                                }
                                setTranslations([]); // Reset translations when switching env
                            }}
                        >
                            {env.name}
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 flex flex-col">

                {/* Top bar: Language ComboBox + Apply Button */}
                <div className="flex items-center mb-6 space-x-4">
                    <select
                        className="p-2 border rounded"
                        value={selectedLanguageCode}
                        onChange={(e) => setSelectedLanguageCode(e.target.value)}
                    >
                        {languages.map((lang) => (
                            <option key={lang.id} value={lang.code}>
                                {lang.name}
                            </option>
                        ))}
                    </select>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={applyLanguageChange}
                    >
                        Apply
                    </button>
                </div>

                {/* Translations Table */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Translations</h2>

                    {translations.length === 0 ? (
                        <p className="text-gray-500">No translations loaded yet.</p>
                    ) : (
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="text-left p-2 border-b">Key</th>
                                    <th className="text-left p-2 border-b">Translation</th>
                                    <th className="text-left p-2 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {translations.map((t, idx) => (
                                    <tr key={idx}>
                                        {editingIndex === idx ? (
                                            <>
                                                <td className="p-2 border-b">
                                                    <input
                                                        type="text"
                                                        className="p-1 border rounded w-full"
                                                        value={editKey}
                                                        onChange={(e) => setEditKey(e.target.value)}
                                                    />
                                                </td>
                                                <td className="p-2 border-b">
                                                    <input
                                                        type="text"
                                                        className="p-1 border rounded w-full"
                                                        value={editTranslation}
                                                        onChange={(e) => setEditTranslation(e.target.value)}
                                                    />
                                                </td>
                                                <td className="p-2 border-b space-x-2">
                                                    <button
                                                        className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                                        onClick={() => {
                                                            const updated = [...translations];
                                                            updated[idx] = { key: editKey, translation: editTranslation };
                                                            setTranslations(updated);
                                                            setEditingIndex(null);
                                                        }}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        className="px-2 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                                                        onClick={() => setEditingIndex(null)}
                                                    >
                                                        Cancel
                                                    </button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="p-2 border-b">{t.key}</td>
                                                <td className="p-2 border-b">{t.translation}</td>
                                                <td className="p-2 border-b">
                                                    <button
                                                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                        onClick={() => {
                                                            setEditingIndex(idx);
                                                            setEditKey(t.key);
                                                            setEditTranslation(t.translation);
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

            </main>
        </div>
    );
};

export default DashboardPage;

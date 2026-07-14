'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import AdminSidebar from '@/components/layouts/admin-sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [settings, setSettings] = useState({
    storeName: 'Minimal Human',
    storeEmail: 'minimalhumanbeing0@gmail.com',
    storePhone: '+91 9037 498360',
    storeLocation: 'Kerala, India',
    currencySymbol: '$',
    taxRate: 0,
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const settingGroups = [
    {
      title: 'Store Information',
      settings: [
        { key: 'storeName', label: 'Store Name', type: 'text' },
        { key: 'storeEmail', label: 'Store Email', type: 'email' },
        { key: 'storePhone', label: 'Store Phone', type: 'tel' },
        { key: 'storeLocation', label: 'Store Location', type: 'text' },
      ],
    },
    {
      title: 'Business Settings',
      settings: [
        { key: 'currencySymbol', label: 'Currency Symbol', type: 'text' },
        { key: 'taxRate', label: 'Tax Rate (%)', type: 'number' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-2xl font-bold text-black">Settings</h1>
            <div className="w-24" />
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl space-y-8"
          >
            {saved && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-50 border border-green-200 rounded text-green-600 text-sm"
              >
                Settings saved successfully!
              </motion.div>
            )}

            {settingGroups.map((group, groupIndex) => (
              <motion.div
                key={groupIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-bold text-black">{group.title}</h2>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {group.settings.map((setting) => (
                      <div key={setting.key}>
                        <label className="block text-sm font-medium text-black mb-2">
                          {setting.label}
                        </label>
                        <input
                          type={setting.type}
                          value={settings[setting.key]}
                          onChange={(e) =>
                            handleChange(
                              setting.key,
                              setting.type === 'number' ? parseFloat(e.target.value) : e.target.value
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button variant="primary" size="lg" onClick={handleSave} className="flex-1 max-w-xs">
                Save Settings
              </Button>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

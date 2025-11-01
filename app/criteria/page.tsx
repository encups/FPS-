'use client';

import { useState, useEffect } from 'react';
import { JobCriteria } from '@/lib/types';
import Link from 'next/link';

export default function CriteriaPage() {
  const [criteria, setCriteria] = useState<JobCriteria>({
    keywords: [],
    excludeKeywords: [],
    locations: [],
    remoteOnly: false,
    minSalary: undefined,
    maxSalary: undefined,
    jobTypes: [],
    companies: [],
    excludeCompanies: [],
    requiredSkills: [],
    postedWithinDays: 30,
  });

  const [keywordInput, setKeywordInput] = useState('');
  const [excludeKeywordInput, setExcludeKeywordInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [companyInput, setCompanyInput] = useState('');
  const [excludeCompanyInput, setExcludeCompanyInput] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadCriteria();
  }, []);

  const loadCriteria = async () => {
    try {
      const res = await fetch('/api/criteria');
      const data = await res.json();
      if (data.criteria) {
        setCriteria(data.criteria);
      }
    } catch (err) {
      console.error('Failed to load criteria:', err);
    }
  };

  const saveCriteria = async () => {
    try {
      const res = await fetch('/api/criteria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ criteria }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert('Failed to save criteria');
      }
    } catch (err) {
      console.error('Failed to save criteria:', err);
      alert('Failed to save criteria');
    }
  };

  const addToArray = (key: keyof JobCriteria, value: string, setter: Function) => {
    if (!value.trim()) return;
    const currentArray = criteria[key] as string[] || [];
    if (!currentArray.includes(value.trim())) {
      setCriteria({ ...criteria, [key]: [...currentArray, value.trim()] });
    }
    setter('');
  };

  const removeFromArray = (key: keyof JobCriteria, value: string) => {
    const currentArray = criteria[key] as string[] || [];
    setCriteria({ ...criteria, [key]: currentArray.filter(v => v !== value) });
  };

  const toggleJobType = (type: string) => {
    const types = criteria.jobTypes || [];
    if (types.includes(type as any)) {
      setCriteria({ ...criteria, jobTypes: types.filter(t => t !== type) });
    } else {
      setCriteria({ ...criteria, jobTypes: [...types, type as any] });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              ⚙️ Job Search Criteria
            </h1>
            <Link
              href="/"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              ← Back to Search
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">

          {/* Keywords */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Keywords
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addToArray('keywords', keywordInput, setKeywordInput)}
                placeholder="Add keyword..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
              <button
                onClick={() => addToArray('keywords', keywordInput, setKeywordInput)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {criteria.keywords?.map((keyword) => (
                <span
                  key={keyword}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2"
                >
                  {keyword}
                  <button
                    onClick={() => removeFromArray('keywords', keyword)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Exclude Keywords */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Exclude Keywords
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={excludeKeywordInput}
                onChange={(e) => setExcludeKeywordInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addToArray('excludeKeywords', excludeKeywordInput, setExcludeKeywordInput)}
                placeholder="Add keyword to exclude..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
              <button
                onClick={() => addToArray('excludeKeywords', excludeKeywordInput, setExcludeKeywordInput)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {criteria.excludeKeywords?.map((keyword) => (
                <span
                  key={keyword}
                  className="px-3 py-1 bg-red-100 text-red-800 rounded-full flex items-center gap-2"
                >
                  {keyword}
                  <button
                    onClick={() => removeFromArray('excludeKeywords', keyword)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Locations
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addToArray('locations', locationInput, setLocationInput)}
                placeholder="Add location..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
              <button
                onClick={() => addToArray('locations', locationInput, setLocationInput)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {criteria.locations?.map((location) => (
                <span
                  key={location}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full flex items-center gap-2"
                >
                  {location}
                  <button
                    onClick={() => removeFromArray('locations', location)}
                    className="text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Remote Only */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remoteOnly"
              checked={criteria.remoteOnly}
              onChange={(e) => setCriteria({ ...criteria, remoteOnly: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <label htmlFor="remoteOnly" className="ml-2 text-sm font-medium text-gray-700">
              Remote jobs only
            </label>
          </div>

          {/* Salary Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Salary (Annual)
              </label>
              <input
                type="number"
                value={criteria.minSalary || ''}
                onChange={(e) => setCriteria({ ...criteria, minSalary: e.target.value ? parseInt(e.target.value) : undefined })}
                placeholder="e.g., 50000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Salary (Annual)
              </label>
              <input
                type="number"
                value={criteria.maxSalary || ''}
                onChange={(e) => setCriteria({ ...criteria, maxSalary: e.target.value ? parseInt(e.target.value) : undefined })}
                placeholder="e.g., 150000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Job Types */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Types
            </label>
            <div className="flex flex-wrap gap-2">
              {['full-time', 'part-time', 'contract', 'internship', 'remote'].map((type) => (
                <button
                  key={type}
                  onClick={() => toggleJobType(type)}
                  className={`px-4 py-2 rounded-lg transition ${
                    criteria.jobTypes?.includes(type as any)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Required Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Skills
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addToArray('requiredSkills', skillInput, setSkillInput)}
                placeholder="Add required skill..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
              <button
                onClick={() => addToArray('requiredSkills', skillInput, setSkillInput)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {criteria.requiredSkills?.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full flex items-center gap-2"
                >
                  {skill}
                  <button
                    onClick={() => removeFromArray('requiredSkills', skill)}
                    className="text-purple-600 hover:text-purple-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Posted Within Days */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Posted Within (Days)
            </label>
            <input
              type="number"
              value={criteria.postedWithinDays || ''}
              onChange={(e) => setCriteria({ ...criteria, postedWithinDays: e.target.value ? parseInt(e.target.value) : undefined })}
              placeholder="e.g., 30"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Save Button */}
          <div className="pt-4 border-t">
            <button
              onClick={saveCriteria}
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              💾 Save Criteria
            </button>
            {saved && (
              <p className="text-green-600 text-center mt-2">
                ✓ Criteria saved successfully!
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

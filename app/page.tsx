'use client'

import React, { useState } from 'react'
const MAX_LENGTH_HISTORY = 5;

type HistoryEntry = {
  url: String;
  timestamp: String;
}

export default function Home() {
  const [urlInput, setUrlInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([])
  // setting the max length value
  const [maxLength, setMaxLength] = useState<number>(1);

  // time stamp implemented here
  const getCurrentTimestamp = (): String => {
    return new Date().toLocaleString();
  };

  const visitUrl = () => {
    if (!urlInput.trim()) return;

    // setHistory((prevHistory) => {
    //   const filtered = prevHistory.filter(url => url !== urlInput);
    //   const newHistory = [urlInput, ...filtered];
    //   return newHistory.slice(0, MAX_LENGTH_HISTORY);
    // });

    setHistory((prevHistory) => {
      const filtered = prevHistory.filter(entry => entry.url !== urlInput);
      const newEntry: HistoryEntry = {
        url: urlInput,
        timestamp: getCurrentTimestamp(),
      };
      return [newEntry, ...filtered].slice(0, maxLength);
    });

    setUrlInput('');
  }

  const handleMaxLengthValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    if (!isNaN(value) && value > 0) {
      setMaxLength(value);
      setHistory(prev => prev.slice(0, value));
    }
  }

  const removeEntry = (urlToRemove: String) => {
    setHistory(prev => prev.filter(entry => entry.url !== urlToRemove));
  };

  return (
    <div className='flex flex-col w-md mx-auto justify-center items-center gap-y-3'>
      <div>Browser History</div>
      <div>
        <input
          type='text'
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder='Enter Url'
          className='border border-gray-500 px-2 py-1 rounded-md'
        />
      </div>
      <button
        onClick={visitUrl}
        className='bg-blue-500 text-white px-4 py-1 rounded-md'
      >
        Visit
      </button>
      <div>
        <div>Max Lenght History:</div>
        <input type="text" 
          value={maxLength} 
          onChange={handleMaxLengthValue} 
          min={1}
          className='border border-gray-500 px-2 py-1 rounded-md'
        />
      </div>
      <div>Recent History</div>
      <ul className='list-disc mt-2 ml-3'>
        {history.map((entry, index) => (
          <li key={index} className='flex flex-row gap-x-1.5'>
            <div>
              <div>{entry.url}</div>
              <div>{entry.timestamp}</div>
            </div>
            <button
              onClick={() => removeEntry(entry.url)}
              className='bg-red-500 text-white px-4 py-1 rounded-md'
            >
              clear
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

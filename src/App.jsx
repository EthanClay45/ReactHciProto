import React, { useState, useRef, useEffect } from 'react';
import { Clock, MessageSquare, Camera, Image, Mail, Music, Video, Phone, Globe, Settings, Map, Calendar, Book, Calculator, Heart } from 'lucide-react';

const apps = [
  { id: 1, name: 'Messages', icon: MessageSquare, color: 'bg-green-500' },
  { id: 2, name: 'Camera', icon: Camera, color: 'bg-gray-600' },
  { id: 3, name: 'Photos', icon: Image, color: 'bg-blue-500' },
  { id: 4, name: 'Mail', icon: Mail, color: 'bg-blue-600' },
  { id: 5, name: 'Music', icon: Music, color: 'bg-red-500' },
  { id: 6, name: 'Videos', icon: Video, color: 'bg-purple-600' },
  { id: 7, name: 'Phone', icon: Phone, color: 'bg-green-600' },
  { id: 8, name: 'Safari', icon: Globe, color: 'bg-blue-400' },
  { id: 9, name: 'Settings', icon: Settings, color: 'bg-gray-500' },
  { id: 10, name: 'Maps', icon: Map, color: 'bg-green-400' },
  { id: 11, name: 'Calendar', icon: Calendar, color: 'bg-red-600' },
  { id: 12, name: 'Books', icon: Book, color: 'bg-orange-500' },
  { id: 13, name: 'Calculator', icon: Calculator, color: 'bg-gray-700' },
  { id: 14, name: 'Clock', icon: Clock, color: 'bg-black' },
  { id: 15, name: 'Health', icon: Heart, color: 'bg-pink-500' }
];

export default function IPhoneScreen() {
  const [contextMenu, setContextMenu] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const longPressTimer = useRef(null);
  const [pressedApp, setPressedApp] = useState(null);
  const [appsWithLimits, setAppsWithLimits] = useState(new Set());

  const handleMouseDown = (app, e) => {
    if (appsWithLimits.has(app.id)) return;
    e.preventDefault();
    e.stopPropagation();
    setPressedApp(app.id);
    const rect = e.currentTarget.getBoundingClientRect();
    longPressTimer.current = setTimeout(() => {
      setContextMenu({
        app,
        x: rect.left + rect.width / 2,
        y: rect.bottom
      });
      setPressedApp(null);
    }, 600);
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    setPressedApp(null);
  };

  const handleMouseLeave = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    setPressedApp(null);
  };

  const handleTouchStart = (app, e) => {
    e.preventDefault();
    setPressedApp(app.id);
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    longPressTimer.current = setTimeout(() => {
      setContextMenu({
        app,
        x: rect.left + rect.width / 2,
        y: rect.bottom
      });
      setPressedApp(null);
    }, 600);
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    setPressedApp(null);
  };

  const handleSetTimeLimit = () => {
    setSelectedApp(contextMenu.app);
    setShowTimePicker(true);
    setContextMenu(null);
  };

  const handleConfirmTimeLimit = () => {
    setAppsWithLimits(prev => new Set([...prev, selectedApp.id]));
    alert(`Time limit set for ${selectedApp.name}: ${hours}h ${minutes}m`);
    setShowTimePicker(false);
    setSelectedApp(null);
    setHours(0);
    setMinutes(0);
  };

  const closeAll = () => {
    setContextMenu(null);
    setShowTimePicker(false);
  };

  useEffect(() => {
    return () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-blue-800 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        {/* iPhone Frame */}
        <div className="bg-black rounded-[3rem] p-3 shadow-2xl">
          <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-[2.5rem] overflow-hidden relative">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-10"></div>
            
            {/* Status Bar */}
            <div className="relative z-0 px-8 pt-2 pb-1 flex justify-between items-center text-white text-xs">
              <span className="font-semibold">9:41</span>
              <div className="flex gap-1 items-center">
                <div className="w-4 h-3 border border-white rounded-sm"></div>
                <div className="w-1 h-3 bg-white rounded-sm"></div>
              </div>
            </div>

            {/* App Grid */}
            <div className="px-6 py-8 grid grid-cols-4 gap-6 min-h-[600px]">
              {apps.map((app) => {
                const Icon = app.icon;
                return (
                  <div
                    key={app.id}
                    className="flex flex-col items-center gap-1 cursor-pointer select-none"
                    onMouseDown={(e) => handleMouseDown(app, e)}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouchStart(app, e)}
                    onTouchEnd={handleTouchEnd}
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <div
                      className={`w-14 h-14 ${app.color} rounded-2xl flex items-center justify-center shadow-lg transition-transform ${
                        pressedApp === app.id ? 'scale-95' : 'scale-100'
                      } ${
                        appsWithLimits.has(app.id) ? 'grayscale opacity-60' : ''
                      }`}
                    >
                      <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                    </div>
                    <span className="text-white text-xs text-center leading-tight">
                      {app.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Home Indicator */}
            <div className="pb-2 flex justify-center">
              <div className="w-32 h-1 bg-white rounded-full opacity-50"></div>
            </div>
          </div>
        </div>

        {/* Context Menu */}
        {contextMenu && (
          <>
            <div
              className="fixed inset-0 z-20"
              onClick={closeAll}
            ></div>
            <div
              className="fixed z-30 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
              style={{
                left: `${contextMenu.x}px`,
                top: `${contextMenu.y + 10}px`,
                transform: 'translateX(-50%)',
                minWidth: '220px'
              }}
            >
              <div className="py-2">
                <button
                  className="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors text-sm"
                  onClick={handleSetTimeLimit}
                >
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Set Time Limit</span>
                  </div>
                </button>
                <button
                  className="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors text-sm text-gray-600"
                  onClick={closeAll}
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}

        {/* Time Picker Modal */}
        {showTimePicker && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={closeAll}
            ></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-3xl shadow-2xl p-6 w-80">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Set Time Limit for {selectedApp?.name}
              </h3>
              
              <div className="flex items-center justify-center gap-4 mb-6">
                {/* Hours Picker */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setHours((h) => Math.min(23, h + 1))}
                    className="w-10 h-10 flex items-center justify-center text-blue-500 text-2xl hover:bg-gray-100 rounded-lg"
                  >
                    +
                  </button>
                  <div className="my-2 text-3xl font-bold w-16 text-center">
                    {hours.toString().padStart(2, '0')}
                  </div>
                  <button
                    onClick={() => setHours((h) => Math.max(0, h - 1))}
                    className="w-10 h-10 flex items-center justify-center text-blue-500 text-2xl hover:bg-gray-100 rounded-lg"
                  >
                    −
                  </button>
                  <span className="text-xs text-gray-500 mt-1">hours</span>
                </div>

                <span className="text-3xl font-bold mb-8">:</span>

                {/* Minutes Picker */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setMinutes((m) => (m + 5) % 60)}
                    className="w-10 h-10 flex items-center justify-center text-blue-500 text-2xl hover:bg-gray-100 rounded-lg"
                  >
                    +
                  </button>
                  <div className="my-2 text-3xl font-bold w-16 text-center">
                    {minutes.toString().padStart(2, '0')}
                  </div>
                  <button
                    onClick={() => setMinutes((m) => (m - 5 + 60) % 60)}
                    className="w-10 h-10 flex items-center justify-center text-blue-500 text-2xl hover:bg-gray-100 rounded-lg"
                  >
                    −
                  </button>
                  <span className="text-xs text-gray-500 mt-1">minutes</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={closeAll}
                  className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmTimeLimit}
                  className="flex-1 py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
                >
                  Set Limit
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
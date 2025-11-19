import React, { useState } from 'react';
import { CreditCard, Plane, Plus, Trash2, Edit2, TrendingUp, Award, Calendar, Percent, X, ChevronDown, ChevronUp } from 'lucide-react';

const CreditCardDashboard = () => {
  const [cards, setCards] = useState([
    { id: 1, name: 'Chase Sapphire Reserve', points: 75000, type: 'Travel', color: 'bg-gradient-to-br from-slate-700 to-slate-900', issuer: 'Chase', lastUpdated: '2 days ago', rewardsProgram: 'Chase Ultimate Rewards' },
    { id: 2, name: 'American Express Gold', points: 45000, type: 'Dining', color: 'bg-gradient-to-br from-slate-600 to-slate-800', issuer: 'Amex', lastUpdated: '1 week ago', rewardsProgram: 'Amex Membership Rewards' },
    { id: 3, name: 'Capital One Venture', points: 32000, type: 'Travel', color: 'bg-gradient-to-br from-gray-700 to-gray-900', issuer: 'Capital One', lastUpdated: '3 days ago', rewardsProgram: 'Capital One Miles' }
  ]);

  const [travelDeals] = useState([
    { id: 1, destination: 'Tokyo, Japan', points: 60000, type: 'Round-trip Flight', airline: 'ANA', savings: '$850', image: '🗾', class: 'Economy', cardId: 1 },
    { id: 2, destination: 'Paris, France', points: 55000, type: 'Round-trip Flight', airline: 'Air France', savings: '$780', image: '🗼', class: 'Economy', cardId: 1 },
    { id: 3, destination: 'Cancun, Mexico', points: 25000, type: 'Round-trip Flight', airline: 'United', savings: '$420', image: '🏖️', class: 'Economy', cardId: 1 },
    { id: 4, destination: 'London, UK', points: 50000, type: 'Round-trip Flight', airline: 'British Airways', savings: '$720', image: '🇬🇧', class: 'Business', cardId: 2 },
    { id: 5, destination: 'Dubai, UAE', points: 70000, type: 'Round-trip Flight', airline: 'Emirates', savings: '$950', image: '🏙️', class: 'Economy', cardId: 2 },
    { id: 6, destination: 'Bali, Indonesia', points: 45000, type: 'Round-trip Flight', airline: 'Singapore Airlines', savings: '$650', image: '🌴', class: 'Economy', cardId: 3 },
    { id: 7, destination: 'Barcelona, Spain', points: 40000, type: 'Round-trip Flight', airline: 'Iberia', savings: '$580', image: '🇪🇸', class: 'Economy', cardId: 3 },
    { id: 8, destination: 'Sydney, Australia', points: 80000, type: 'Round-trip Flight', airline: 'Qantas', savings: '$1100', image: '🦘', class: 'Economy', cardId: 1 }
  ]);

  const [showAddCard, setShowAddCard] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [newCard, setNewCard] = useState({ name: '', points: '', type: 'Travel', color: 'bg-gradient-to-br from-slate-700 to-slate-900', issuer: '', rewardsProgram: '' });
  const [activeTab, setActiveTab] = useState('overview');

  const totalPoints = cards.reduce((sum, card) => sum + card.points, 0);

  const cardColors = [
    'bg-gradient-to-br from-slate-700 to-slate-900',
    'bg-gradient-to-br from-slate-600 to-slate-800',
    'bg-gradient-to-br from-slate-500 to-slate-700',
    'bg-gradient-to-br from-gray-700 to-gray-900',
    'bg-gradient-to-br from-gray-600 to-gray-800',
    'bg-gradient-to-br from-zinc-700 to-zinc-900',
    'bg-gradient-to-br from-zinc-600 to-zinc-800',
    'bg-gradient-to-br from-neutral-700 to-neutral-900'
  ];

  const handleAddCard = () => {
    if (newCard.name && newCard.points) {
      setCards([...cards, {
        id: Date.now(),
        name: newCard.name,
        points: parseInt(newCard.points),
        type: newCard.type,
        color: newCard.color,
        issuer: newCard.issuer || 'Other',
        lastUpdated: 'Just now',
        rewardsProgram: newCard.rewardsProgram || 'Points'
      }]);
      setNewCard({ name: '', points: '', type: 'Travel', color: 'bg-gradient-to-br from-slate-700 to-slate-900', issuer: '', rewardsProgram: '' });
      setShowAddCard(false);
    }
  };

  const handleDeleteCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const handleEditCard = (card) => {
    setEditingCard(card.id);
    setNewCard({ name: card.name, points: card.points.toString(), type: card.type, color: card.color, issuer: card.issuer, rewardsProgram: card.rewardsProgram });
  };

  const handleUpdateCard = () => {
    if (newCard.name && newCard.points) {
      setCards(cards.map(card => 
        card.id === editingCard 
          ? { ...card, name: newCard.name, points: parseInt(newCard.points), type: newCard.type, color: newCard.color, issuer: newCard.issuer, rewardsProgram: newCard.rewardsProgram, lastUpdated: 'Just now' }
          : card
      ));
      setEditingCard(null);
      setNewCard({ name: '', points: '', type: 'Travel', color: 'bg-gradient-to-br from-slate-700 to-slate-900', issuer: '', rewardsProgram: '' });
    }
  };

  const getCardForDeal = (cardId) => {
    return cards.find(card => card.id === cardId);
  };

  const canAffordWithCard = (deal) => {
    const card = getCardForDeal(deal.cardId);
    return card && card.points >= deal.points;
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center p-4">
      {/* iPhone 14 Pro Device Frame - Fixed 390x844px */}
      <div className="relative w-[390px] h-[844px] bg-black rounded-[55px] p-2 shadow-2xl flex-shrink-0">
        
        {/* Dynamic Island */}
        <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full z-50"></div>
        
        {/* iPhone Screen */}
        <div className="w-full h-full bg-white rounded-[48px] overflow-hidden flex flex-col">
          
          {/* Status Bar - Fixed Height */}
          <div className="bg-white px-8 pt-[54px] pb-2 flex-shrink-0">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span>9:41</span>
              <div className="flex gap-1 items-center">
                <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                  <rect x="0.5" y="0.5" width="16" height="11" rx="2.5" stroke="black"/>
                  <path d="M17 4V8C17.8 7.66667 18.5 7 18.5 6C18.5 5 17.8 4.33333 17 4Z" fill="black"/>
                  <rect x="2" y="2" width="13" height="8" rx="1" fill="black"/>
                </svg>
              </div>
            </div>
          </div>

          {/* App Header - Fixed Height */}
          <div className="bg-blue-600 text-white px-4 py-4 flex-shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-6 h-6" />
              <h1 className="text-xl font-bold">Rewards Tracker</h1>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'overview' 
                    ? 'bg-white text-blue-600' 
                    : 'bg-blue-500 text-white'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('travel')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'travel' 
                    ? 'bg-white text-blue-600' 
                    : 'bg-blue-500 text-white'
                }`}
              >
                Travel Deals
              </button>
            </div>
          </div>

          {/* Main Content Area - Scrollable with Always-Visible Scrollbar */}
          <div className="flex-1 overflow-y-scroll bg-white">
            <div className="p-4 pb-20">
              
              {/* Dashboard Tab */}
              {activeTab === 'overview' && (
                <div className="w-full space-y-4">
                  
                  {/* Total Points Hero Card */}
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 text-white shadow-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-blue-100 text-xs mb-1">Total Points</p>
                        <h2 className="text-4xl font-bold mb-1">{totalPoints.toLocaleString()}</h2>
                        <p className="text-blue-100 text-xs">Across {cards.length} cards</p>
                      </div>
                      <TrendingUp className="w-10 h-10 text-blue-300 opacity-50" />
                    </div>
                  </div>

                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="bg-white rounded-xl p-3 shadow-md border border-slate-200">
                      <div className="bg-blue-100 w-8 h-8 rounded-lg flex items-center justify-center mb-2">
                        <Percent className="w-4 h-4 text-blue-600" />
                      </div>
                      <p className="text-lg font-bold text-slate-900">1.5¢</p>
                      <p className="text-xs text-slate-600">Per point</p>
                    </div>

                    <div className="bg-white rounded-xl p-3 shadow-md border border-slate-200">
                      <div className="bg-green-100 w-8 h-8 rounded-lg flex items-center justify-center mb-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      </div>
                      <p className="text-lg font-bold text-green-600">+12.5K</p>
                      <p className="text-xs text-slate-600">This month</p>
                    </div>

                    <div className="bg-white rounded-xl p-3 shadow-md border border-slate-200">
                      <div className="bg-purple-100 w-8 h-8 rounded-lg flex items-center justify-center mb-2">
                        <Plane className="w-4 h-4 text-purple-600" />
                      </div>
                      <p className="text-lg font-bold text-slate-900">{travelDeals.filter(deal => canAffordWithCard(deal)).length}</p>
                      <p className="text-xs text-slate-600">Available</p>
                    </div>
                  </div>

                  {/* Credit Cards List - Collapsible */}
                  <div className="space-y-3">
                    {cards.map(card => {
                      const isExpanded = expandedCard === card.id;
                      
                      return (
                        <div key={card.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
                          
                          {/* Card Preview - Always Visible */}
                          <div 
                            onClick={() => setExpandedCard(isExpanded ? null : card.id)}
                            className="active:bg-slate-50 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center justify-between p-4">
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                  <CreditCard className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-bold text-slate-900 text-sm truncate">{card.name}</h4>
                                  <p className="text-slate-600 text-xs">{card.issuer}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <p className="text-xl font-bold text-slate-900">{card.points.toLocaleString()}</p>
                                  <p className="text-slate-500 text-xs">pts</p>
                                </div>
                                {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                              </div>
                            </div>
                          </div>

                          {/* Card Details - Expanded View */}
                          {isExpanded && (
                            <div className="border-t border-slate-200 bg-slate-50 p-4">
                              <div className="space-y-3 mb-4">
                                <div>
                                  <p className="text-slate-600 text-xs mb-0.5">Rewards Program</p>
                                  <p className="font-semibold text-slate-900 text-sm">{card.rewardsProgram}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <p className="text-slate-600 text-xs mb-0.5">Type</p>
                                    <p className="font-semibold text-slate-900 text-sm">{card.type}</p>
                                  </div>
                                  <div>
                                    <p className="text-slate-600 text-xs mb-0.5">Updated</p>
                                    <p className="font-semibold text-slate-900 text-sm">{card.lastUpdated}</p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex gap-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditCard(card);
                                    setExpandedCard(null);
                                  }}
                                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold active:scale-95 transition-transform"
                                >
                                  <Edit2 className="w-4 h-4" />
                                  Edit
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (window.confirm('Delete this card?')) {
                                      handleDeleteCard(card.id);
                                      setExpandedCard(null);
                                    }
                                  }}
                                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border-2 border-red-200 text-red-600 rounded-lg text-sm font-semibold active:scale-95 transition-transform"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Add Card Button */}
                  <button
                    onClick={() => setShowAddCard(true)}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md active:scale-95 transition-transform"
                  >
                    <Plus className="w-5 h-5" />
                    Add Card
                  </button>

                </div>
              )}

              {/* Travel Deals Tab */}
              {activeTab === 'travel' && (
                <div className="w-full space-y-4">
                  
                  {/* Tab Header */}
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Travel Deals</h2>
                    <p className="text-slate-600 text-xs">Redemption opportunities</p>
                  </div>

                  {/* Travel Deals List */}
                  {travelDeals.map(deal => {
                    const card = getCardForDeal(deal.cardId);
                    const canAfford = canAffordWithCard(deal);
                    
                    return (
                      <div key={deal.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
                        
                        {/* Destination Header */}
                        <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 text-center border-b border-slate-200">
                          <div className="text-4xl mb-2">{deal.image}</div>
                          <h4 className="font-bold text-slate-900 text-base">{deal.destination}</h4>
                        </div>
                        
                        {/* Deal Details */}
                        <div className="p-4">
                          
                          {/* Associated Card Badge */}
                          {card && (
                            <div className={`${card.color} text-white text-xs font-semibold px-2 py-1.5 rounded-lg mb-3 flex items-center gap-1.5`}>
                              <CreditCard className="w-3.5 h-3.5" />
                              <span className="truncate">{card.name}</span>
                            </div>
                          )}

                          {/* Flight Details */}
                          <div className="space-y-2 mb-3 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-600">Airline</span>
                              <span className="font-semibold text-slate-900">{deal.airline}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-600">Class</span>
                              <span className="font-semibold text-slate-900">{deal.class}</span>
                            </div>
                          </div>
                          
                          {/* Points & Value */}
                          <div className="border-t border-slate-200 pt-3 mb-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-2xl font-bold text-blue-600">{deal.points.toLocaleString()}</p>
                                <p className="text-xs text-slate-500">points needed</p>
                              </div>
                              <div className="text-right">
                                <p className="text-xl font-bold text-green-600">{deal.savings}</p>
                                <p className="text-xs text-slate-500">cash value</p>
                              </div>
                            </div>
                          </div>

                          {/* Your Balance */}
                          {card && (
                            <div className="bg-slate-50 rounded-lg p-2 mb-3">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-600">Your Balance</span>
                                <span className="font-bold text-slate-900">{card.points.toLocaleString()} pts</span>
                              </div>
                            </div>
                          )}
                          
                          {/* Action Button / Status */}
                          {canAfford ? (
                            <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold text-sm active:scale-95 transition-transform">
                              Book This Trip
                            </button>
                          ) : card ? (
                            <div className="w-full bg-orange-50 border border-orange-200 text-orange-700 py-2.5 rounded-lg text-center text-xs font-semibold">
                              Need {(deal.points - card.points).toLocaleString()} more points
                            </div>
                          ) : (
                            <div className="w-full bg-slate-100 text-slate-600 py-2.5 rounded-lg text-center text-xs font-semibold">
                              Card not found
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Home Indicator Bar - Fixed Height */}
          <div className="bg-white py-2.5 flex justify-center flex-shrink-0">
            <div className="w-36 h-1.5 bg-black rounded-full opacity-60"></div>
          </div>
        </div>
      </div>

      {/* Add/Edit Card Modal - Bottom Sheet */}
      {(showAddCard || editingCard) && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-3xl w-full max-w-[390px] p-6 pb-8">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900">
                {editingCard ? 'Edit Card' : 'Add New Card'}
              </h3>
              <button
                onClick={() => {
                  setShowAddCard(false);
                  setEditingCard(null);
                  setNewCard({ name: '', points: '', type: 'Travel', color: 'bg-gradient-to-br from-slate-700 to-slate-900', issuer: '', rewardsProgram: '' });
                }}
                className="p-2 hover:bg-slate-100 rounded-full active:scale-95 transition-transform"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Card Name</label>
                <input
                  type="text"
                  value={newCard.name}
                  onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                  placeholder="Chase Sapphire Preferred"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Issuer</label>
                <input
                  type="text"
                  value={newCard.issuer}
                  onChange={(e) => setNewCard({ ...newCard, issuer: e.target.value })}
                  placeholder="Chase"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Points Balance</label>
                <input
                  type="number"
                  value={newCard.points}
                  onChange={(e) => setNewCard({ ...newCard, points: e.target.value })}
                  placeholder="50000"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Rewards Program</label>
                <input
                  type="text"
                  value={newCard.rewardsProgram}
                  onChange={(e) => setNewCard({ ...newCard, rewardsProgram: e.target.value })}
                  placeholder="Ultimate Rewards"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Card Color</label>
                <div className="grid grid-cols-4 gap-2">
                  {cardColors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setNewCard({ ...newCard, color })}
                      className={`h-12 rounded-xl ${color} ${
                        newCard.color === color ? 'ring-2 ring-blue-600 ring-offset-2 scale-105' : ''
                      } transition-transform active:scale-95`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Submit Button */}
              <button
                onClick={editingCard ? handleUpdateCard : handleAddCard}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold active:scale-95 transition-transform"
              >
                {editingCard ? 'Save Changes' : 'Add Card'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditCardDashboard;
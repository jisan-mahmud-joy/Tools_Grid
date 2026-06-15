import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const SubscriptionCard = ({ toolId, title }) => {
  const { unlockTool, isToolUnlocked } = useContext(AppContext);

  const unlocked = isToolUnlocked(toolId);

  return (
    <div className="p-4 bg-slate-900 rounded-xl border border-white/10">
      <h3 className="font-bold">{title}</h3>

      {unlocked ? (
        <p className="text-green-400 text-sm mt-2">Unlocked ✅</p>
      ) : (
        <>
          <p className="text-red-400 text-sm mt-2">Locked 🔒</p>

          <button
            onClick={() => unlockTool(toolId, 30)}
            className="mt-3 px-3 py-1 bg-amber-500 text-black rounded"
          >
            30 days unlock (Demo)
          </button>
        </>
      )}
    </div>
  );
};

export default SubscriptionCard;
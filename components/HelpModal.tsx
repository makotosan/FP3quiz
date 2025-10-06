
import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const HelpModal: React.FC = () => {
  const { isHelpModalOpen, dispatch } = useAppContext();

  if (!isHelpModalOpen) return null;

  const handleClose = () => {
    dispatch({ type: 'TOGGLE_HELP_MODAL' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[100]" onClick={handleClose}>
      <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">アプリの使い方</h2>
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-semibold text-lg mb-1">ホーム画面</h3>
            <p>学習全体の進捗状況を確認できます。「今日の学習を始める」ボタンで、ランダムなカテゴリからクイズを開始します。</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">カテゴリ画面</h3>
            <p>学習したい分野を選んでクイズを始められます。各分野の正答率も確認できます。</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">学習履歴画面</h3>
            <p>日々の正答率の推移や学習時間をグラフで確認し、モチベーションを維持しましょう。</p>
          </div>
           <div>
            <h3 className="font-semibold text-lg mb-1">設定画面</h3>
            <p>文字サイズの変更や、間違えた問題の優先出題など、学習しやすいようにカスタマイズできます。</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">ホーム画面に追加 (PWA)</h3>
            <p>ブラウザのメニューから「ホーム画面に追加」を選択すると、このアプリをスマホにインストールでき、オフラインでも利用可能になります。</p>
          </div>
        </div>
        <button onClick={handleClose} className="mt-6 w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
          閉じる
        </button>
      </div>
    </div>
  );
};

export default HelpModal;

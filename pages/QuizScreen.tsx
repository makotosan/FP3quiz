
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { Question } from '../types';

const QuizScreen: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { questions, dispatch, history } = useAppContext();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const quizQuestions = useMemo(() => {
    if (!category) return [];
    
    // Handle special categories
    if (category === '苦手問題') {
        return questions.filter(q => history.wrong_questions.includes(q.id));
    }
    if (category === 'お気に入り') {
        return questions.filter(q => history.favorites.includes(q.id));
    }
    if (category === '過去問') {
        // Placeholder for future implementation
        return [];
    }

    // Handle standard categories: filter, shuffle, and take 5
    const filtered = questions.filter(q => q.category === category);
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);

  }, [category, questions, history.wrong_questions, history.favorites]);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  useEffect(() => {
    const startTime = Date.now();
    return () => {
        const endTime = Date.now();
        const minutes = Math.round((endTime - startTime) / (1000 * 60));
        if (minutes > 0) {
            dispatch({ type: 'ADD_STUDY_TIME', payload: { minutes } });
        }
    };
  }, [dispatch]);

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    const correct = index === currentQuestion.correct_answer_index;
    setIsCorrect(correct);
    dispatch({
      type: 'ANSWER_QUESTION',
      payload: {
        questionId: currentQuestion.id,
        isCorrect: correct,
        category: currentQuestion.category,
      },
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setIsCorrect(null);
    } else {
      navigate('/categories');
    }
  };
  
  const getButtonClass = (index: number) => {
    if (selectedAnswer === null) {
      return 'bg-white hover:bg-indigo-50 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-gray-200';
    }
    if (index === currentQuestion.correct_answer_index) {
      return 'bg-green-100 border-green-500 text-green-800 font-bold dark:bg-green-500/20 dark:border-green-500 dark:text-green-300';
    }
    if (index === selectedAnswer) {
      return 'bg-red-100 border-red-500 text-red-800 dark:bg-red-500/20 dark:border-red-500 dark:text-red-300';
    }
    return 'bg-white opacity-60 dark:bg-slate-700 dark:opacity-70 dark:text-gray-400';
  };
  
  if (!currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 dark:text-gray-200">
          「{category}」に該当する問題がありません。
        </h2>
        <p className="text-gray-500 mb-6 dark:text-gray-400">他のカテゴリを試してみてください。</p>
        <button onClick={() => navigate('/categories')} className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg">
          カテゴリ選択へ
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-700 dark:text-indigo-400">{category}</h1>
        <span className="text-lg font-mono bg-gray-200 text-gray-700 px-3 py-1 rounded-md dark:bg-slate-700 dark:text-gray-200">
          {currentQuestionIndex + 1} / {quizQuestions.length}
        </span>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md dark:bg-slate-800">
        <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-100">{currentQuestion.question}</p>
      </div>

      <div className="space-y-3">
        {currentQuestion.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={selectedAnswer !== null}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 text-gray-700 ${getButtonClass(index)}`}
          >
            {choice}
          </button>
        ))}
      </div>

      {selectedAnswer !== null && (
        <div className={`p-4 rounded-lg text-center ${isCorrect ? 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300'}`}>
          <span className="font-bold text-2xl">{isCorrect ? '正解！' : '不正解...'}</span>
        </div>
      )}

      {selectedAnswer !== null && (
        <div className="flex flex-col space-y-3">
          <button onClick={() => setShowExplanation(true)} className="w-full bg-gray-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-600">
            解説を見る
          </button>
          <button onClick={handleNextQuestion} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700">
            {currentQuestionIndex < quizQuestions.length - 1 ? '次の問題へ' : 'カテゴリ一覧へ'}
          </button>
        </div>
      )}

      {showExplanation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto dark:bg-slate-800">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">解説</h2>
            <div className="space-y-4">
              <p className="font-semibold dark:text-gray-200">正解: {currentQuestion.choices[currentQuestion.correct_answer_index]}</p>
              <p className="text-gray-700 leading-relaxed dark:text-gray-300">{currentQuestion.explanation}</p>
            </div>
            <button onClick={() => setShowExplanation(false)} className="mt-6 w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700">
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizScreen;
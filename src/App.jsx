import { useState, useEffect } from 'react';
import { quotes } from './data/quotes';
import QuoteCard from './components/QuoteCard';
import ThemeToggle from './components/ThemeToggle';
import CategorySelector from './components/CategorySelector';
import Header from './components/Header';

const categories = ['All', 'Motivation', 'Resilience', 'Bible', 'API: Bible', 'API: Internet'];

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [quote, setQuote] = useState(null);
  const [hasLoadedQuote, setHasLoadedQuote] = useState(false);

  const getLocalQuotes = () => {
    return selectedCategory === 'All'
      ? quotes
      : quotes.filter(q => q.category === selectedCategory);
  };

  const getRandomLocalQuote = () => {
    const pool = getLocalQuotes();
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const fetchBibleQuote = async (useVotd = false) => {
    try {
      const url = useVotd
        ? 'https://labs.bible.org/api/?passage=votd&type=json'
        : 'https://labs.bible.org/api/?passage=random&type=json';
      const response = await fetch(url);
      const data = await response.json();

      if (!data || !data.length) {
        throw new Error('No verse returned');
      }

      const { text, bookname, chapter, verse } = data[0];
      return {
        text,
        author: `${bookname} ${chapter}:${verse}`,
        category: 'Bible'
      };
    } catch (error) {
      console.error('Error fetching Bible quote:', error);
      return {
        text: 'Unable to fetch Bible verse at the moment.',
        author: 'System',
        category: 'Bible'
      };
    }
  };

  const fetchInternetQuote = async () => {
    const data = await fetch('https://dummyjson.com/quotes/random')
      .then(res => res.json());
    return {
      text: data.quote,
      author: data.author,
      category: 'API'
    };
  };

  const loadQuote = async () => {
    if (selectedCategory === 'API: Bible') {
      const quote = await fetchBibleQuote(!hasLoadedQuote);
      setQuote(quote);
    } else if (selectedCategory === 'API: Internet') {
      setQuote(await fetchInternetQuote());
    } else {
      setQuote(getRandomLocalQuote());
    }

    if (!hasLoadedQuote) {
      setHasLoadedQuote(true);
    }
  };

  useEffect(() => {
    loadQuote();
  }, [selectedCategory]);

  return (
    <>
      <Header />
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <ThemeToggle />
        <CategorySelector
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        {quote && <QuoteCard quote={quote} />}
        <button onClick={loadQuote}>Surprise Me</button>
      </div>
    </>
  );
}

export default App;
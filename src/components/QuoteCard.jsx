const QuoteCard = ({ quote }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
  };

  return (
    <div>
      <h2>"{quote.text}"</h2>
      <p>- {quote.author}</p>
      <button onClick={copyToClipboard}>Copy</button>
    </div>
  );
};

export default QuoteCard;
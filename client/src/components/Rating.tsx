const Rating: React.FC<{ rating: number }> = ({ rating }) => {
  const ratingStyle = (value: number) =>
    rating >= value
      ? 'fas fa-star'
      : rating >= value - 0.5
      ? 'fas fa-star-half-alt'
      : 'far fa-star';
  return (
    <div style={{ color: '#e2d520' }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span>
          <i className={ratingStyle(s)}></i>
        </span>
      ))}
    </div>
  );
};

export default Rating;

type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div>
      <label className='text-md font-semibold mb-2'> Max Price</label>
      <select
        className='p-2 border rounded-md w-full'
        value={selectedPrice}
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
      >
        <option value=''>Select Max Price</option>
        {[1000, 1500, 2000, 2500, 3000].map((price, i) => (
          <option key={i} value={price}>{price}</option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;

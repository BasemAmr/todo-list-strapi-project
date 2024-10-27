export const RadioGroup: React.FC<{
    value: boolean | string;
    onChange: (value: boolean) => void;
  }> = ({ value, onChange }) => (
    <div className="flex items-center space-x-4">
      <label className="flex items-center w-full">
        <input
          type="radio"
          checked={value === true}
          onChange={() => onChange(true)}
          className="peer hidden"
        />
        <span className="peer-checked:bg-green-500 peer-checked:text-white px-4 py-2 rounded-full cursor-pointer transition duration-200 border border-gray-300 shadow-sm w-full text-center">
          Yes
        </span>
      </label>
      <label className="flex items-center w-full">
        <input
          type="radio"
          checked={value === false}
          onChange={() => onChange(false)}
          className="peer hidden"
        />
        <span className="peer-checked:bg-red-500 peer-checked:text-white px-4 py-2 rounded-full cursor-pointer transition duration-200 border border-gray-300 shadow-sm w-full text-center">
          No
        </span>
      </label>
    </div>
  );
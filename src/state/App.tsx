import { decrement, increment } from './counterSlice';
import { useAppDispatch, useAppSelector } from './hooks';

export default function App() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col items-center p-4">
      <div className="text-2xl font-bold mb-4">Current Value: {count}</div>
      <div>
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          type="button"
          className="bg-red-500 text-white px-4 py-2 ml-2 rounded"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}

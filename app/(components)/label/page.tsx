const LabelPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <h1 className="text-2xl font-bold">
        Step 2: Tell the model what each photo is
      </h1>
      <div className="flex gap-10 ">
        <button className="bg-blue-200 text-white px-4 py-2 rounded">
          Cat
        </button>
        <button className="bg-red-200 text-white px-4 py-2 rounded">
          Not a Cat
        </button>
        <button className="bg-yellow-200 text-white px-4 py-2 rounded">
          Still to label
        </button>
      </div>
      <div className="flex gap-50">
        <button className="bg-gray-500 text-white px-4 py-2 rounded">
          Back
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          continue
        </button>
      </div>
    </div>
  );
};

export default LabelPage;

const IssueLoading = () => {
  return (
    <div className="w-[90%] mx-auto h-[70vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-gray-300">
        <div className="h-10 w-10 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin" />
        <div className="text-center">
          <p className="text-lg font-medium text-gray-100">Loading Issue</p>
          <p className="text-sm text-gray-400 mt-1">
            Please wait while we fetch the issue details...
          </p>
        </div>
      </div>
    </div>
  );
};

export default IssueLoading;

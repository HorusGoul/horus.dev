interface CodeTagProps {
  children: string;
}

function CodeTag({ children }: CodeTagProps) {
  return (
    <code className="bg-gray-200 rounded-md font-bold text-black text-sm p-1 xsm:mx-1 xsm:text-lg md:text-xl">
      {children}
    </code>
  );
}

export default CodeTag;

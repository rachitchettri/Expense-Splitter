export default function GroupList({ groups, setActiveGroup }) {
  return (
    <div className="space-y-2">
      {groups.map((g) => (
        <button
          key={g._id}
          onClick={() => setActiveGroup(g)}
          className="w-full text-left p-3 rounded-lg bg-[#6b8e23] text-white"
        >
          {g.name}
        </button>
      ))}
    </div>
  );
}

export const Signup = ({onSubmit}) => (
<form onSubmit={e => {e.preventDefault(); onSubmit?.(Object.fromEntries(new FormData(e.target)));}} className="flex gap-2">
<input name="email" placeholder="email" className="border rounded p-1" />
<input name="password" type="password" placeholder="password" className="border rounded p-1" />
<button className="px-3 py-1 bg-blue-600 text-white rounded">Sign</button>
</form>
);
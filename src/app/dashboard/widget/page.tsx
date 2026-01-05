import { createClient } from "@/lib/supabase/server";

export default async function WidgetPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Placeholder API key - will be fetched from contractors table
  const apiKey = "YOUR_API_KEY";
  const widgetCode = `<script src="https://tysonstechsolutions.com/widget/loader.js" data-api-key="${apiKey}"></script>`;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Chat Widget</h1>
        <p className="text-slate-600 mt-1">Install the AI chat widget on your website</p>
      </div>

      {/* Widget Code */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Installation</h2>
        <p className="text-slate-600 mb-4">
          Copy and paste this code snippet just before the closing <code className="bg-slate-100 px-1 rounded">&lt;/body&gt;</code> tag on your website.
        </p>
        <div className="relative">
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
            {widgetCode}
          </pre>
          <button
            className="absolute top-2 right-2 px-3 py-1 bg-slate-700 text-white text-sm rounded hover:bg-slate-600 transition-colors"
          >
            Copy
          </button>
        </div>
      </div>

      {/* Widget Settings */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Widget Settings</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Widget Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                defaultValue="#2563eb"
                className="w-12 h-10 rounded cursor-pointer"
              />
              <input
                type="text"
                defaultValue="#2563eb"
                className="px-3 py-2 rounded-lg border border-slate-300 text-sm w-32"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Position</label>
            <select className="px-4 py-2 rounded-lg border border-slate-300 text-sm">
              <option value="bottom-right">Bottom Right</option>
              <option value="bottom-left">Bottom Left</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Welcome Message</label>
            <textarea
              rows={3}
              defaultValue="Hi! I can help you get a quick quote. What is the address of the property?"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm"
            />
          </div>
        </div>

        <div className="mt-6">
          <button className="px-6 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors">
            Save Settings
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Preview</h2>
        <div className="bg-slate-100 rounded-lg h-96 flex items-center justify-center">
          <p className="text-slate-500">Widget preview coming soon</p>
        </div>
      </div>
    </div>
  );
}

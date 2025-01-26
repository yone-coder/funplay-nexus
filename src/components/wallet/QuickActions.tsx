import { Upload, Download, RefreshCw, Send } from "lucide-react";

const quickActions = [
  { icon: <Upload className="h-6 w-6" />, label: 'Deposit' },
  { icon: <Download className="h-6 w-6" />, label: 'Withdraw' },
  { icon: <RefreshCw className="h-6 w-6" />, label: 'Swap' },
  { icon: <Send className="h-6 w-6" />, label: 'Send' },
];

export const QuickActions = () => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {quickActions.map((action, index) => (
        <button
          key={index}
          className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-700/20 transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-gaming-500 flex items-center justify-center mb-2">
            {action.icon}
          </div>
          <span className="text-sm">{action.label}</span>
        </button>
      ))}
    </div>
  );
};
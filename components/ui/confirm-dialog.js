import { motion } from 'framer-motion';
import { Button } from './button';

export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg max-w-sm w-full"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-black mb-2">{title}</h2>
          <p className="text-gray-600 mb-6">{message}</p>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="md"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="accent"
              size="md"
              onClick={onConfirm}
              className="flex-1"
            >
              Delete
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

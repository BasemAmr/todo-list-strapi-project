import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

export const EmptyState = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center py-12"
  >
    <div className="bg-gray-50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
      <Calendar className="w-10 h-10 text-gray-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-800">No todos yet</h3>
    <p className="text-gray-500 mt-2">Create your first todo to get started</p>
  </motion.div>
);

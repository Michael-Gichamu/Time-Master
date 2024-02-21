import { useState } from 'react';
const ProjectModal = ({ isOpen, onClose, onUpdate, mode }) => {
  const [newTitle, setNewTitle] = useState('');

  const handleUpdate = () => {
    // Call the onUpdate function with the new title
    onUpdate(newTitle);

    // Close the modal
    onClose();
  };

  const modalTitle = mode === 'create' ? 'Create Project' : 'Update Title';

  return (
    <div className={`${isOpen ? 'visible' : 'hidden'}`}>
      <div className="w-full *:my-2 custom-black p-3 px-5 rounded-md">
        <div className='flex justify-between'>
          <h2>{modalTitle}</h2>
          <span className="close" onClick={onClose}>&times;</span>
        </div>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter new title"
          className='w-full px-2 py-1 rounded-md border border-transparent focus:outline-none custom-darkgray focus:ring-2 focus:ring-blue-400 focus:border-transparent'
        />
        <button onClick={handleUpdate} className="block custom-blue px-3 py-1 rounded-lg">
          {mode === 'create' ? 'Create' : 'Update'}
        </button>
      </div>
    </div>
  );
};

export default ProjectModal;
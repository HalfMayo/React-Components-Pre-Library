import { motion } from 'framer-motion'

import { ReactComponent as Write } from './assets/svg/write-svgrepo-com.svg'
import { ReactComponent as Delete } from './assets/svg/bin-delete-recycle-svgrepo-com.svg'
import { useRef, useEffect } from 'react';

export default function ActionButtons({editItem, deleteItem, index, setShowButtons}) {

    const editButtons = useRef(null);

    function clickOutside(e) {
        if(editButtons.current && !editButtons.current.contains(e.target)) {
            setShowButtons(null);
        }
    }

    useEffect(() => {
        window.addEventListener("mousedown", clickOutside);
        return () => {
            window.removeEventListener("mousedown", clickOutside);
        }
    }, [])

    return(
        <motion.div ref={editButtons} className="show"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                            duration: 0.8,
                            ease: [0, 0.71, 0.2, 1.01]
                    }}>
                        <button aria-label="Edit task" value={index} onClick={() => editItem(index)}>
                            <Write />
                        </button>
                        <button aria-label="Delete task" value={index} onClick={() => deleteItem(index)}>
                            <Delete />
                        </button>
        </motion.div>
    )
}
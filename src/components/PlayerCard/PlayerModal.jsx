//eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

const PlayerModal = ({ player, onClose }) => {
    const {
        name,
        position,
        photo,
        yearsPlaying,
        bio,
        hometown,
        occupation,
        favoriteShot,
        favoriteCurler,
    } = player;

    return (
        <div className='player-modal-overlay' onClick={onClose}>
            <motion.div
                className="player-modal"
                onClick={(e) => e.stopPropagation()} // prevent background close
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
            >
                <button className="modal-close" onClick={onClose}>✕</button>
                <img src={photo || '/placeholder-avatar.jpg'} alt={`${name}`} />
                <h3>{name}</h3>
                <p>{position}</p>
                <p>{bio}</p>
                <p>Years Curled: {yearsPlaying}</p>
                <p>From: {hometown}</p>
                <p>Occupation: {occupation}</p>
                <p>Favorite Shot: {favoriteShot}</p>
                <p>Favorite Curler: {favoriteCurler}</p>
            </motion.div>
        </div>

    )
}

export default PlayerModal;
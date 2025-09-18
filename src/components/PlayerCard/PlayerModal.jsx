//eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

const PlayerModal = ({ player, onClose }) => {
    const {
        name,
        position,
        largePhoto,
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
                <div className='player-modal-image'>
                    <img src={largePhoto || '/placeholder-avatar.jpg'} alt={`${name}`} />
                </div>
                <div className='player-modal-info'>
                    <h3>{name}</h3>
                    <p>{position}</p>
                    <b>Years Curled:</b> {yearsPlaying}<br/>
                    <b>From:</b> {hometown}<br/>
                    <b>Occupation:</b> {occupation}<br/>
                    <b>Favorite Shot:</b> {favoriteShot}<br/>
                    <b>Favorite Curler:</b> {favoriteCurler}<br/>
                    <div dangerouslySetInnerHTML={{ __html: bio }}></div>
                </div>
            </motion.div>
        </div>

    )
}

export default PlayerModal;
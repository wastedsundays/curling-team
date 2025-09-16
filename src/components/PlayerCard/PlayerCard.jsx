

const PlayerCard = ({
    name,
    position,
    photo,
    onClick
}) => {

    return (
        <div className="player-card" onClick={onClick}>

            <div className='player-card-image-small'>
                <img src={photo || '/placeholder-player.png'} alt={name || 'Player Photo'} />
            </div>
            <div className='player-card-content'>
                <h3 className='player-card__name'>{name}</h3>
                <p className='player-card__position'>{position}</p>
            </div>

        </div>
    )
}

export default PlayerCard;
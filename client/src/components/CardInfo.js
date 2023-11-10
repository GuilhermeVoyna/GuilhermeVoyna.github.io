import "../css/components/CardInfo.css";




const CardInfo =({ setShowModal,TipUser}) => {



    const handleClick = () => {
        setShowModal(false)
    }


    return(
        <div className="plu-info">
            <div className="close-icon" onClick={handleClick}>ⓧ</div>
            <p>Date: {`${TipUser.day}/${TipUser.month}/${TipUser.year}`}</p>
            <p>Type: {TipUser.type}</p>
            <p>About: {TipUser.about && TipUser.about.trim() !== "" ? TipUser.about : 'No information provided'}</p>
  
        </div>
    )
}
export default CardInfo;
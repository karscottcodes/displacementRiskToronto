function InfoPanel({info}) {
    
    return (
        <>
        <h2 className="pb-3">Info Panel</h2>
        <p>{info.areaName}</p>
        <p>Classification: {info.classification}</p>
        </>
    );
}

export default InfoPanel;
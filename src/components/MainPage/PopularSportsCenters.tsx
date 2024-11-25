import { useNavigate } from 'react-router-dom';

const PopularSportsCenters = () => {
    const navigate = useNavigate();

    const handleViewMoreClick = () => {
        navigate('/MapPage');
    };

    return (
        <div style={{ border: '1px solid #8EC6C5', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>인기 스포츠 지원센터</h2>
                <button
                    onClick={handleViewMoreClick}
                    style={{
                        border: 'none',
                        background: 'none',
                        textDecoration: 'underline',
                        color: '#3C6E71',
                        cursor: 'pointer'
                    }}
                >
                    더보기
                </button>
            </div>
            {[1, 2, 3].map((_, idx) => (
                <div key={idx} style={{ margin: '10px 0', padding: '10px', background: '#f0f0f0', borderRadius: '5px' }}>
                    <h3>XX 체육관</h3>
                    <p>경기도 시흥시 산기대학로 어쩌고</p>
                    <span style={{ float: 'right', color: '#3C6E71' }}>2km</span>
                </div>
            ))}
        </div>
    );
};

export default PopularSportsCenters;

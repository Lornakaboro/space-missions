import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchRockets, reserve } from '../../redux/rockets/rocketsSlice';

function Rockets() {
  const { rockets, status } = useSelector((state) => state.rockets);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!status) dispatch(fetchRockets({ method: 'GET' }));
  }, [status, dispatch]);

  return (
    <section>
      {rockets.map((rocket) => (
        <div key={rocket.id} className="rocket-item">
          <img src={rocket.image} alt={rocket.name} />
          <div className="rocket-info">
            <h2 className="rocket-name">{rocket.name}</h2>
            <p className="reservation-actions">
              {rocket.reserved && <span className="reserved-span">reserved</span>}
              {' '}
              {rocket.description}
            </p>
            <button className={`${rocket.reserved ? 'cancel' : 'reserve'}`} onClick={() => { dispatch(reserve(rocket.id)); }} type="button">{`${rocket.reserved ? 'Cancel Reservation' : 'Reserve Rocket'}`}</button>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Rockets;

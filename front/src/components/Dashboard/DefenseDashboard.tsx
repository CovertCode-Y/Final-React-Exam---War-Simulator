import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { interceptMissile, addAlert } from '../../features/defense/defenseSlice';
import './DefenseDashboard.css';

export const DefenseDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const interceptors = useSelector((state: RootState) => state.defense.interceptors);
  const alerts = useSelector((state: RootState) => state.defense.alerts);
  const missilesIntercepted = useSelector((state: RootState) => state.defense.missilesIntercepted);

  useEffect(() => {
    dispatch(addAlert({ _id: '1', type: 'Rocket', region: 'North', timeout: 5000 }));
  }, [dispatch]);

  const handleIntercept = (missileId: string, interceptorSpeed: number) => {
    dispatch(interceptMissile({ missileId, interceptorSpeed }));
  };

  return (
    <div className="defense-dashboard">
      <h2 className="defense-title">Defense Dashboard</h2>
      <h3 className="interceptor-title">Interceptors</h3>
      <div className="interceptor-controls">
        {interceptors.map((interceptor) => (
          <button
            key={interceptor.type}
            className="interceptor-button"
            disabled={interceptor.status === 'in-use'}
            onClick={() => {
              const missileToIntercept = alerts.find((alert) => alert.type === 'Rocket');
              if (missileToIntercept) {
                handleIntercept(missileToIntercept._id, 5);
              }
            }}
          >
            {interceptor.type} ({interceptor.status})
          </button>
        ))}
      </div>

      <h3 className="missile-alerts-title">Missile Alerts</h3>
      <table className="missile-table">
        <thead>
          <tr>
            <th>Rocket</th>
            <th>Time to Hit</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr key={alert._id}>
              <td>{alert.type}</td>
              <td>{(alert.timeout / 1000).toFixed(2)}s</td>
              <td>{missilesIntercepted.includes(alert._id) ? 'Intercepted' : 'Active'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

import { LogOut } from 'lucide-react';

const LogoutDialog = ({ onConfirm, onCancel }) => {
  return (
    <div className="dialog-overlay" onClick={onCancel}>
      <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-icon">
          <LogOut size={28} color="var(--accent)" />
        </div>
        <h3 className="dialog-title">Log out?</h3>
        <p className="dialog-desc">You'll need to sign in again to access your account.</p>
        <div className="dialog-actions">
          <button className="dialog-btn-cancel" onClick={onCancel}>Cancel</button>
          <button className="dialog-btn-confirm" onClick={onConfirm}>Log out</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutDialog;

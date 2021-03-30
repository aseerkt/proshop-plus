import cn from 'classnames';
import { useMsgStore } from '../zustand/useMsgStore';
import styles from '../styles/components/Message.module.scss';

const Message = () => {
  const msg = useMsgStore((state) => state.msg);
  const severity = useMsgStore((state) => state.severity);
  const clearAlert = useMsgStore((state) => state.clearAlert);

  let severityStyles = '';

  switch (severity) {
    case 'error':
      severityStyles = styles.message__error;
      break;
    case 'info':
      severityStyles = styles.message__info;
      break;
    case 'success':
      severityStyles = styles.message__success;
      break;
  }

  return severity ? (
    <div className={cn(styles.message, severityStyles)}>
      {msg && msg.length > 0 && (
        <>
          <p>{msg}</p>
          <i onClick={() => clearAlert()} className='fas fa-times'></i>
        </>
      )}
    </div>
  ) : null;
};

export default Message;

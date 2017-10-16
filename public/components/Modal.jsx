import React from 'react';

export default props => {
  const payload = props.selected.payload && props.selected.payload !== '' && (
    <div key={Object.keys(props.selected).length} className="sequence-modal-body-details-entry">
      <span className="entry-key">payload</span>
      <pre>
        {JSON.stringify(JSON.parse(props.selected.payload), null, 2)}
      </pre>
    </div>
  );

  return (
    <div className="sequence-modal" style={props.style}>
      <div className="sequence-modal-header">
        <button onClick={props.close}>Fermer</button>
      </div>
      <div className="sequence-modal-body">
        {Object.keys(props.selected).map(key => {
          if (key === 'payload') {
            return null;
          }

          return (
            <div key={key} className="sequence-modal-body-details-entry">
              <span className="entry-key">{key}</span>
              <span className="entry-value">
                {key !== 'payload' && props.selected[key]}
              </span>
            </div>
          );
        })}

        {payload}
      </div>
    </div>
  );
}

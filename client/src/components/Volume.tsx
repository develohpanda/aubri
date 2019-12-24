import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {UPDATE_VOLUME} from '../constants/actionTypes';
import {SvgVolumeMute24Px} from '../icons/VolumeMute24Px';
import {SvgVolumeUp24Px} from '../icons/VolumeUp24Px';
import {State} from '../State';
import {iconProps} from './GlobalPlayer';

const volumeHeight = 50;

export const Volume: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement | null>(null);
  const volume = useSelector((state: State) => state.player.volume);
  // move this to localstorage?
  const [localVol, setLocalVol] = useState(1);
  const toggle = () => setIsOpen(!isOpen);

  const setVolume = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('volume');
    const offSet = el?.getBoundingClientRect().y;

    if (offSet) {
      const percent = 1 - (e.clientY - offSet) / volumeHeight;

      if (percent - 1 > -1 && percent + 1 > 1) {
        dispatch({type: UPDATE_VOLUME, volume: percent});
        setLocalVol(percent);
      }
    }
    console.log(
      `getBoundingClientRect for volume element not found, ignoring volume set.`
    );
  };

  const explicitSetVolume = (vol: number) => {
    if (volume === 0) {
      dispatch({type: UPDATE_VOLUME, volume: localVol});
    } else {
      dispatch({type: UPDATE_VOLUME, volume: vol});
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div ref={ref} className="d-flex flex-row">
      <div>
        {isOpen && (
          <div
            id="volume"
            className="position-absolute d-flex align-items-end bg-dark"
            onClick={setVolume}
            style={{
              top: '-60px',
              right: '35px',
              width: '10px',
              height: `${volumeHeight}px`,
              cursor: 'pointer',
              opacity: 0.8,
            }}
          >
            <div
              className="w-100 bg-warning"
              style={{height: `${volume * 100}%`}}
            ></div>
          </div>
        )}
        <SvgVolumeMute24Px
          {...iconProps}
          onClick={() => explicitSetVolume(0)}
        />
      </div>
      <SvgVolumeUp24Px {...iconProps} onClick={toggle} />
    </div>
  );
};

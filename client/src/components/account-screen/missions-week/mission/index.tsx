import React from 'react';

import { IMission } from '../../../../interfaces';

type Props = {

} & IMission;

const Mission = ({ completed, description, stars, title, type, week }: Props) => {
  return (
    <div>
      <h4>{title} {completed && '✔️'}</h4>
      <p>{description}</p>
      <p>⭐ {stars}</p>
    </div>
  );
};

export default Mission;

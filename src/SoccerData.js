// SoccerData.js
export const positions = [
    'Goalkeeper (GK)', 'Center Back (CB)', 'Left Center Back (LCB)', 'Right Center Back (RCB)',
    'Left Back (LB)', 'Right Back (RB)', 'Defensive Midfielder (CDM)', 'Left Defensive Midfielder (LDM)',
    'Right Defensive Midfielder (RDM)', 'Central Midfielder (CM)', 'Left Central Midfielder (LCM)',
    'Right Central Midfielder (RCM)', 'Left Midfielder (LM)', 'Right Midfielder (RM)', 'Attacking Midfielder (CAM)',
    'Left Attacking Midfielder (LCAM)', 'Right Attacking Midfielder (RCAM)', 'Left Winger (LW)',
    'Right Winger (RW)', 'Striker (ST)', 'Left Striker (LST)', 'Right Striker (RST)'
  ];
  
  export const roles = {
    'Goalkeeper (GK)': ['Goalkeeper', 'Sweeper Keeper'],
    'Right Back (RB)': ['Fullback', 'Wingback', 'Falseback', 'Attacking Wingback'],
    'Left Back (LB)': ['Fullback', 'Wingback', 'Falseback', 'Attacking Wingback'],
    'Center Back (CB)': ['Defender', 'Stopper', 'Ball-Playing Defender'],
    'Left Center Back (LCB)': ['Defender', 'Stopper', 'Ball-Playing Defender'],
    'Right Center Back (RCB)': ['Defender', 'Stopper', 'Ball-Playing Defender'],
    'Defensive Midfielder (CDM)': ['Holding', 'Centre-Half', 'Deep-Lying Playmaker'],
    'Left Defensive Midfielder (LDM)': ['Holding', 'Centre-Half', 'Deep-Lying Playmaker'],
    'Right Defensive Midfielder (RDM)': ['Holding', 'Centre-Half', 'Deep-Lying Playmaker'],
    'Central Midfielder (CM)': ['Box-to-Box', 'Holding', 'Deep-Lying Playmaker', 'Playmaker', 'Half-Winger'],
    'Left Central Midfielder (LCM)': ['Box-to-Box', 'Holding', 'Deep-Lying Playmaker', 'Playmaker', 'Half-Winger'],
    'Right Central Midfielder (RCM)': ['Box-to-Box', 'Holding', 'Deep-Lying Playmaker', 'Playmaker', 'Half-Winger'],
    'Attacking Midfielder (CAM)': ['Playmaker', 'Shadow Striker', 'Half-Winger'],
    'Left Attacking Midfielder (LCAM)': ['Playmaker', 'Shadow Striker', 'Half-Winger'],
    'Right Attacking Midfielder (RCAM)': ['Playmaker', 'Shadow Striker', 'Half-Winger'],
    'Left Midfielder (LM)': ['Winger', 'Wide Midfielder', 'Wide Playmaker', 'Inside Forward'],
    'Right Midfielder (RM)': ['Winger', 'Wide Midfielder', 'Wide Playmaker', 'Inside Forward'],
    'Left Winger (LW)': ['Winger', 'Inside Forward', 'Wide Playmaker'],
    'Right Winger (RW)': ['Winger', 'Inside Forward', 'Wide Playmaker'],
    'Striker (ST)': ['Advance Forward', 'Poacher', 'False 9', 'Target Forward'],
    'Left Striker (LST)': ['Advance Forward', 'Poacher', 'False 9', 'Target Forward'],
    'Right Striker (RST)': ['Advance Forward', 'Poacher', 'False 9', 'Target Forward']
  };
  
  export const focuses = ['Balanced', 'Defend', 'Attack', 'Build-Up', 'Roaming', 'Complete', 'Wide'];
  
  export const options = {
    tacticalpreset: ['Balanced', 'Long Ball', 'Wing Play', 'Tiki Taka', 'Pressing', 'Park the Bus', 'Counter Attack'],
    buildupstyle: ['Balanced', 'Counter', 'Short Passing'],
    defensiveapproach: ['Deep', 'Normal', 'High', 'Aggressive']
  };
  
  // Formations definitions
  export const formations = {
    '4-4-2': {
      'Goalkeeper (GK)': { role: 'Goalkeeper', focus: 'Balanced' },
      'Left Back (LB)': { role: 'Fullback', focus: 'Defend' },
      'Right Back (RB)': { role: 'Fullback', focus: 'Defend' },
      'Left Center Back (LCB)': { role: 'Defender', focus: 'Balanced' },
      'Right Center Back (RCB)': { role: 'Defender', focus: 'Balanced' },
      'Left Midfielder (LM)': { role: 'Winger', focus: 'Attack' },
      'Right Midfielder (RM)': { role: 'Winger', focus: 'Attack' },
      'Left Central Midfielder (LCM)': { role: 'Box-to-Box', focus: 'Balanced' },
      'Right Central Midfielder (RCM)': { role: 'Box-to-Box', focus: 'Balanced' },
      'Left Striker (LST)': { role: 'Poacher', focus: 'Attack' },
      'Right Striker (RST)': { role: 'Advance Forward', focus: 'Attack' }
    },
    '4-3-3': {
      'Goalkeeper (GK)': { role: 'Goalkeeper', focus: 'Balanced' },
      'Left Back (LB)': { role: 'Wingback', focus: 'Attack' },
      'Right Back (RB)': { role: 'Wingback', focus: 'Attack' },
      'Left Center Back (LCB)': { role: 'Ball-Playing Defender', focus: 'Balanced' },
      'Right Center Back (RCB)': { role: 'Ball-Playing Defender', focus: 'Balanced' },
      'Central Midfielder (CM)': { role: 'Playmaker', focus: 'Build-Up' },
      'Left Winger (LW)': { role: 'Inside Forward', focus: 'Attack' },
      'Right Winger (RW)': { role: 'Inside Forward', focus: 'Attack' },
      'Striker (ST)': { role: 'False 9', focus: 'Roaming' }
    },
    '3-5-2': {
      'Goalkeeper (GK)': { role: 'Goalkeeper', focus: 'Balanced' },
      'Left Center Back (LCB)': { role: 'Defender', focus: 'Defend' },
      'Center Back (CB)': { role: 'Sweeper', focus: 'Balanced' },
      'Right Center Back (RCB)': { role: 'Defender', focus: 'Defend' },
      'Left Midfielder (LM)': { role: 'Wingback', focus: 'Attack' },
      'Right Midfielder (RM)': { role: 'Wingback', focus: 'Attack' },
      'Central Midfielder (CM)': { role: 'Box-to-Box', focus: 'Balanced' },
      'Attacking Midfielder (CAM)': { role: 'Playmaker', focus: 'Attack' },
      'Striker (ST)': { role: 'Poacher', focus: 'Attack' },
      'Striker (ST)': { role: 'Target Man', focus: 'Balanced' }
    },
    '4-2-3-1': {
      'Goalkeeper (GK)': { role: 'Goalkeeper', focus: 'Balanced' },
      'Left Back (LB)': { role: 'Fullback', focus: 'Balanced' },
      'Right Back (RB)': { role: 'Fullback', focus: 'Balanced' },
      'Left Center Back (LCB)': { role: 'Defender', focus: 'Defend' },
      'Right Center Back (RCB)': { role: 'Defender', focus: 'Defend' },
      'Left Defensive Midfielder (LDM)': { role: 'Defensive Midfielder', focus: 'Balanced' },
      'Right Defensive Midfielder (RDM)': { role: 'Defensive Midfielder', focus: 'Balanced' },
      'Attacking Midfielder (CAM)': { role: 'Playmaker', focus: 'Attack' },
      'Left Winger (LW)': { role: 'Inside Forward', focus: 'Attack' },
      'Right Winger (RW)': { role: 'Inside Forward', focus: 'Attack' },
      'Striker (ST)': { role: 'Advanced Forward', focus: 'Attack' }
    }
  };

  
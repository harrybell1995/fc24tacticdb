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
        '4-2-3-1 (Narrow)': {
          'Goalkeeper (GK)': { role: 'Goalkeeper', focus: 'Balanced' },
          'Left Back (LB)': { role: 'Fullback', focus: 'Balanced' },
          'Right Back (RB)': { role: 'Fullback', focus: 'Balanced' },
          'Left Center Back (LCB)': { role: 'Defender', focus: 'Balanced' },
          'Right Center Back (RCB)': { role: 'Defender', focus: 'Balanced' },
          'Left Defensive Midfielder (LDM)': { role: 'Holding', focus: 'Defend' },
          'Right Defensive Midfielder (RDM)': { role: 'Holding', focus: 'Defend' },
          'Attacking Midfielder (CAM)': { role: 'Playmaker', focus: 'Build-Up' },
          'Left Attacking Midfielder (LCAM)': { role: 'Playmaker', focus: 'Build-Up' },
          'Right Attacking Midfielder (RCAM)': { role: 'Playmaker', focus: 'Build-Up' },
          'Striker (ST)': { role: 'Poacher', focus: 'Attack' }
        },
        '4-2-3-1 (Wide)': {
          'Goalkeeper (GK)': { role: 'Goalkeeper', focus: 'Balanced' },
          'Left Back (LB)': { role: 'Fullback', focus: 'Balanced' },
          'Right Back (RB)': { role: 'Fullback', focus: 'Balanced' },
          'Left Center Back (LCB)': { role: 'Defender', focus: 'Balanced' },
          'Right Center Back (RCB)': { role: 'Defender', focus: 'Balanced' },
          'Left Defensive Midfielder (LDM)': { role: 'Holding', focus: 'Defend' },
          'Right Defensive Midfielder (RDM)': { role: 'Holding', focus: 'Defend' },
          'Attacking Midfielder (CAM)': { role: 'Playmaker', focus: 'Build-Up' },
          'Left Midfielder (LM)': { role: 'Winger', focus: 'Attack' },
          'Right Midfielder (RM)': { role: 'Winger', focus: 'Attack' },
          'Striker (ST)': { role: 'Advance Forward', focus: 'Attack' }
        },
        '4-3-3 (Attack)': {
          'Goalkeeper (GK)': { role: 'Goalkeeper', focus: 'Balanced' },
          'Left Back (LB)': { role: 'Wingback', focus: 'Attack' },
          'Right Back (RB)': { role: 'Wingback', focus: 'Attack' },
          'Left Center Back (LCB)': { role: 'Ball-Playing Defender', focus: 'Balanced' },
          'Right Center Back (RCB)': { role: 'Ball-Playing Defender', focus: 'Balanced' },
          'Left Central Midfielder (LCM)': { role: 'Box-to-Box', focus: 'Build-Up' },
          'Attacking Midfielder (CAM)': { role: 'Playmaker', focus: 'Build-Up' },
          'Right Central Midfielder (RCM)': { role: 'Box-to-Box', focus: 'Build-Up' },
          'Left Winger (LW)': { role: 'Inside Forward', focus: 'Attack' },
          'Right Winger (RW)': { role: 'Inside Forward', focus: 'Attack' },
          'Striker (ST)': { role: 'False 9', focus: 'Roaming' }
        },
        '4-3-3 (Defend)': {
          'Goalkeeper (GK)': { role: 'Goalkeeper', focus: 'Balanced' },
          'Left Back (LB)': { role: 'Fullback', focus: 'Defend' },
          'Right Back (RB)': { role: 'Fullback', focus: 'Defend' },
          'Left Center Back (LCB)': { role: 'Defender', focus: 'Defend' },
          'Right Center Back (RCB)': { role: 'Defender', focus: 'Defend' },
          'Left Central Midfielder (LCM)': { role: 'Holding', focus: 'Defend' },
          'Defensive Midfielder (CDM)': { role: 'Holding', focus: 'Balanced' },
          'Right Central Midfielder (RCM)': { role: 'Holding', focus: 'Defend' },
          'Left Winger (LW)': { role: 'Wide Midfielder', focus: 'Defend' },
          'Right Winger (RW)': { role: 'Wide Midfielder', focus: 'Defend' },
          'Striker (ST)': { role: 'Target Forward', focus: 'Defend' }
        },
        '4-3-3 (False 9)': {
          'Goalkeeper (GK)': { role: 'Goalkeeper', focus: 'Balanced' },
          'Left Back (LB)': { role: 'Wingback', focus: 'Attack' },
          'Right Back (RB)': { role: 'Wingback', focus: 'Attack' },
          'Left Center Back (LCB)': { role: 'Ball-Playing Defender', focus: 'Balanced' },
          'Right Center Back (RCB)': { role: 'Ball-Playing Defender', focus: 'Balanced' },
          'Left Central Midfielder (LCM)': { role: 'Box-to-Box', focus: 'Build-Up' },
          'Defensive Midfielder (CDM)': { role: 'Holding', focus: 'Balanced' },
          'Right Central Midfielder (RCM)': { role: 'Box-to-Box', focus: 'Build-Up' },
          'Left Winger (LW)': { role: 'Inside Forward', focus: 'Attack' },
          'Right Winger (RW)': { role: 'Inside Forward', focus: 'Attack' },
          'Striker (ST)': { role: 'False 9', focus: 'Roaming' }
        },
        '4-4-2 (Defensive)': {
          'Goalkeeper (GK)': { role: 'Goalkeeper', focus: 'Balanced' },
          'Left Back (LB)': { role: 'Fullback', focus: 'Defend' },
          'Right Back (RB)': { role: 'Fullback', focus: 'Defend' },
          'Left Center Back (LCB)': { role: 'Defender', focus: 'Balanced' },
          'Right Center Back (RCB)': { role: 'Defender', focus: 'Balanced' },
          'Left Midfielder (LM)': { role: 'Wide Midfielder', focus: 'Attack' },
          'Right Midfielder (RM)': { role: 'Wide Midfielder', focus: 'Attack' },
          'Left Defensive Midfielder (LDM)': { role: 'Holding', focus: 'Defend' },
          'Right Defensive Midfielder (RDM)': { role: 'Holding', focus: 'Defend' },
          'Left Striker (LST)': { role: 'Advance Forward', focus: 'Attack' },
          'Right Striker (RST)': { role: 'Poacher', focus: 'Attack' }
        },
        '4-4-2 (Diamond)': {
          'Goalkeeper (GK)': { role: 'Goalkeeper', focus: 'Balanced' },
          'Left Back (LB)': { role: 'Fullback', focus: 'Balanced' },
          'Right Back (RB)': { role: 'Fullback', focus: 'Balanced' },
          'Left Center Back (LCB)': { role: 'Defender', focus: 'Balanced' },
          'Right Center Back (RCB)': { role: 'Defender', focus: 'Balanced' },
          'Defensive Midfielder (CDM)': { role: 'Holding', focus: 'Balanced' },
          'Left Midfielder (LM)': { role: 'Wide Midfielder', focus: 'Attack' },
          'Right Midfielder (RM)': { role: 'Wide Midfielder', focus: 'Attack' },
          'Attacking Midfielder (CAM)': { role: 'Playmaker', focus: 'Attack' },
          'Left Striker (LST)': { role: 'Advance Forward', focus: 'Attack' },
          'Right Striker (RST)': { role: 'Poacher', focus: 'Attack' }
        },
        '4-1-2-1-2 (Narrow)': {
          'Goalkeeper (GK)': { role: 'Goalkeeper', focus: 'Balanced' },
          'Left Back (LB)': { role: 'Fullback', focus: 'Balanced' },
          'Right Back (RB)': { role: 'Fullback', focus: 'Balanced' },
          'Left Center Back (LCB)': { role: 'Defender', focus: 'Balanced' },
          'Right Center Back (RCB)': { role: 'Defender', focus: 'Balanced' },
          'Defensive Midfielder (CDM)': { role: 'Holding', focus: 'Defend' },
          'Left Central Midfielder (LCM)': { role: 'Box-to-Box', focus: 'Balanced' },
          'Right Central Midfielder (RCM)': { role: 'Box-to-Box', focus: 'Balanced' },
          'Attacking Midfielder (CAM)': { role: 'Playmaker', focus: 'Build-Up' },
          'Left Striker (LST)': { role: 'Advance Forward', focus: 'Attack' },
          'Right Striker (RST)': { role: 'Advance Forward', focus: 'Attack' }
        },
        '4-1-2-1-2 (Wide)': {
          'Goalkeeper (GK)': { role: 'Goalkeeper', focus: 'Balanced' },
          'Left Back (LB)': { role: 'Fullback', focus: 'Balanced' },
          'Right Back (RB)': { role: 'Fullback', focus: 'Balanced' },
          'Left Center Back (LCB)': { role: 'Defender', focus: 'Balanced' },
          'Right Center Back (RCB)': { role: 'Defender', focus: 'Balanced' },
          'Defensive Midfielder (CDM)': { role: 'Holding', focus: 'Defend' },
          'Left Midfielder (LM)': { role: 'Wide Midfielder', focus: 'Attack' },
          'Right Midfielder (RM)': { role: 'Wide Midfielder', focus: 'Attack' },
          'Attacking Midfielder (CAM)': { role: 'Playmaker', focus: 'Build-Up' },
          'Left Striker (LST)': { role: 'Advance Forward', focus: 'Attack' },
          'Right Striker (RST)': { role: 'Advance Forward', focus: 'Attack' }
        },
        '4-5-1 (Attack)': {
          'Goalkeeper (GK)': { role: 'Goalkeeper', focus: 'Balanced' },
          'Left Back (LB)': { role: 'Fullback', focus: 'Balanced' },
          'Right Back (RB)': { role: 'Fullback', focus: 'Balanced' },
          'Left Center Back (LCB)': { role: 'Defender', focus: 'Balanced' },
          'Right Center Back (RCB)': { role: 'Defender', focus: 'Balanced' },
          'Left Midfielder (LM)': { role: 'Winger', focus: 'Attack' },
          'Right Midfielder (RM)': { role: 'Winger', focus: 'Attack' },
          'Central Midfielder (CM)': { role: 'Box-to-Box', focus: 'Balanced' },
          'Left Attacking Midfielder (LCAM)': { role: 'Playmaker', focus: 'Build-Up' },
          'Right Attacking Midfielder (RCAM)': { role: 'Playmaker', focus: 'Build-Up' },
          'Striker (ST)': { role: 'Advance Forward', focus: 'Attack' }
        },
        '4-5-1 (Flat)': {
          'Goalkeeper (GK)': { role: 'Goalkeeper', focus: 'Balanced' },
          'Left Back (LB)': { role: 'Fullback', focus: 'Balanced' },
          'Right Back (RB)': { role: 'Fullback', focus: 'Balanced' },
          'Left Center Back (LCB)': { role: 'Defender', focus: 'Balanced' },
          'Right Center Back (RCB)': { role: 'Defender', focus: 'Balanced' },
          'Left Midfielder (LM)': { role: 'Wide Midfielder', focus: 'Defend' },
          'Right Midfielder (RM)': { role: 'Wide Midfielder', focus: 'Defend' },
          'Central Midfielder (CM)': { role: 'Box-to-Box', focus: 'Balanced' },
          'Left Central Midfielder (LCM)': { role: 'Box-to-Box', focus: 'Balanced' },
          'Right Central Midfielder (RCM)': { role: 'Box-to-Box', focus: 'Balanced' },
          'Striker (ST)': { role: 'Target Forward', focus: 'Defend' }
        },
        '4-1-4-1': {
          'Goalkeeper (GK)': { role: 'Goalkeeper', focus: 'Balanced' },
          'Left Back (LB)': { role: 'Fullback', focus: 'Balanced' },
          'Right Back (RB)': { role: 'Fullback', focus: 'Balanced' },
          'Left Center Back (LCB)': { role: 'Defender', focus: 'Balanced' },
          'Right Center Back (RCB)': { role: 'Defender', focus: 'Balanced' },
          'Defensive Midfielder (CDM)': { role: 'Holding', focus: 'Balanced' },
          'Left Central Midfielder (LCM)': { role: 'Box-to-Box', focus: 'Balanced' },
          'Right Central Midfielder (RCM)': { role: 'Box-to-Box', focus: 'Balanced' },
          'Left Midfielder (LM)': { role: 'Wide Midfielder', focus: 'Attack' },
          'Right Midfielder (RM)': { role: 'Wide Midfielder', focus: 'Attack' },
          'Striker (ST)': { role: 'Advance Forward', focus: 'Attack' }
        },
        '4-2-2-2': {
          'Goalkeeper (GK)': { role: 'Goalkeeper', focus: 'Balanced' },
          'Left Back (LB)': { role: 'Fullback', focus: 'Balanced' },
          'Right Back (RB)': { role: 'Fullback', focus: 'Balanced' },
          'Left Center Back (LCB)': { role: 'Defender', focus: 'Balanced' },
          'Right Center Back (RCB)': { role: 'Defender', focus: 'Balanced' },
          'Left Defensive Midfielder (LDM)': { role: 'Holding', focus: 'Balanced' },
          'Right Defensive Midfielder (RDM)': { role: 'Holding', focus: 'Balanced' },
          'Left Attacking Midfielder (LCAM)': { role: 'Playmaker', focus: 'Build-Up' },
          'Right Attacking Midfielder (RCAM)': { role: 'Playmaker', focus: 'Build-Up' },
          'Left Striker (LST)': { role: 'Advance Forward', focus: 'Attack' },
          'Right Striker (RST)': { role: 'Advance Forward', focus: 'Attack' }
        },
        '3-4-3 (Flat)': {
          'Goalkeeper (GK)': { role: 'Goalkeeper', focus: 'Balanced' },
          'Left Center Back (LCB)': { role: 'Defender', focus: 'Balanced' },
          'Center Back (CB)': { role: 'Defender', focus: 'Balanced' },
          'Right Center Back (RCB)': { role: 'Defender', focus: 'Balanced' },
          'Left Midfielder (LM)': { role: 'Wingback', focus: 'Attack' },
          'Right Midfielder (RM)': { role: 'Wingback', focus: 'Attack' },
          'Left Central Midfielder (LCM)': { role: 'Box-to-Box', focus: 'Balanced' },
          'Right Central Midfielder (RCM)': { role: 'Box-to-Box', focus: 'Balanced' },
          'Left Winger (LW)': { role: 'Inside Forward', focus: 'Attack' },
          'Right Winger (RW)': { role: 'Inside Forward', focus: 'Attack' },
          'Striker (ST)': { role: 'False 9', focus: 'Roaming' }
        },
        '3-4-1-2': {
          'Goalkeeper (GK)': { role: 'Goalkeeper', focus: 'Balanced' },
          'Left Center Back (LCB)': { role: 'Defender', focus: 'Balanced' },
          'Center Back (CB)': { role: 'Defender', focus: 'Balanced' },
          'Right Center Back (RCB)': { role: 'Defender', focus: 'Balanced' },
          'Left Midfielder (LM)': { role: 'Wingback', focus: 'Attack' },
          'Right Midfielder (RM)': { role: 'Wingback', focus: 'Attack' },
          'Left Defensive Midfielder (LDM)': { role: 'Holding', focus: 'Balanced' },
          'Right Defensive Midfielder (RDM)': { role: 'Holding', focus: 'Balanced' },
          'Attacking Midfielder (CAM)': { role: 'Playmaker', focus: 'Build-Up' },
          'Left Striker (LST)': { role: 'Advance Forward', focus: 'Attack' },
          'Right Striker (RST)': { role: 'Advance Forward', focus: 'Attack' }
        },
        '3-5-2': {
          'Goalkeeper (GK)': { role: 'Goalkeeper', focus: 'Balanced' },
          'Left Center Back (LCB)': { role: 'Defender', focus: 'Balanced' },
          'Center Back (CB)': { role: 'Defender', focus: 'Balanced' },
          'Right Center Back (RCB)': { role: 'Defender', focus: 'Balanced' },
          'Left Midfielder (LM)': { role: 'Wingback', focus: 'Attack' },
          'Right Midfielder (RM)': { role: 'Wingback', focus: 'Attack' },
          'Central Midfielder (CM)': { role: 'Box-to-Box', focus: 'Balanced' },
          'Left Attacking Midfielder (LCAM)': { role: 'Playmaker', focus: 'Build-Up' },
          'Right Attacking Midfielder (RCAM)': { role: 'Playmaker', focus: 'Build-Up' },
          'Striker (ST)': { role: 'Advance Forward', focus: 'Attack' }
        },
        '3-1-4-2': {
          'Goalkeeper (GK)': { role: 'Goalkeeper', focus: 'Balanced' },
          'Left Center Back (LCB)': { role: 'Defender', focus: 'Balanced' },
          'Center Back (CB)': { role: 'Defender', focus: 'Balanced' },
          'Right Center Back (RCB)': { role: 'Defender', focus: 'Balanced' },
          'Defensive Midfielder (CDM)': { role: 'Holding', focus: 'Defend' },
          'Left Midfielder (LM)': { role: 'Wingback', focus: 'Attack' },
          'Right Midfielder (RM)': { role: 'Wingback', focus: 'Attack' },
          'Left Central Midfielder (LCM)': { role: 'Box-to-Box', focus: 'Balanced' },
          'Right Central Midfielder (RCM)': { role: 'Box-to-Box', focus: 'Balanced' },
          'Left Striker (LST)': { role: 'Advance Forward', focus: 'Attack' },
          'Right Striker (RST)': { role: 'Advance Forward', focus: 'Attack' }
        }
  };

  
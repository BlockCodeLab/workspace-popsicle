import { ScratchBlocks, makeToolboxXML, blockSeparator, categorySeparator } from '@blockcode/blocks-editor';

import '../generators/python';

const xmlEscape = (unsafe) => {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
    }
  });
};

const motion = (isStage, targetId) => `
  <category name="%{BKY_CATEGORY_MOTION}" id="motion" colour="#4C97FF" secondaryColour="#3373CC">
    ${
      isStage
        ? `<label text="${ScratchBlocks.Msg.MOTION_STAGE_SELECTED}"/>`
        : `
          <block type="motion_movesteps">
            <value name="STEPS">
              <shadow type="math_number">
                <field name="NUM">10</field>
              </shadow>
            </value>
          </block>
          <block type="motion_turnright">
            <value name="DEGREES">
              <shadow type="math_number">
                <field name="NUM">15</field>
              </shadow>
            </value>
          </block>
          <block type="motion_turnleft">
            <value name="DEGREES">
              <shadow type="math_number">
                <field name="NUM">15</field>
              </shadow>
            </value>
          </block>
          ${blockSeparator}
          <block type="motion_goto">
            <value name="TO">
              <shadow type="motion_goto_menu" />
            </value>
          </block>
          <block type="motion_gotoxy">
            <value name="X">
              <shadow id="movex" type="math_number">
                <field name="NUM">0</field>
              </shadow>
            </value>
            <value name="Y">
              <shadow id="movey" type="math_number">
                <field name="NUM">0</field>
              </shadow>
            </value>
          </block>
          <block type="motion_glideto" id="motion_glideto">
            <value name="SECS">
              <shadow type="math_number">
                <field name="NUM">1</field>
              </shadow>
            </value>
            <value name="TO">
              <shadow type="motion_glideto_menu" />
            </value>
          </block>
          <block type="motion_glidesecstoxy">
            <value name="SECS">
              <shadow type="math_number">
                <field name="NUM">1</field>
              </shadow>
            </value>
            <value name="X">
              <shadow id="glidex" type="math_number">
                <field name="NUM">0</field>
              </shadow>
            </value>
            <value name="Y">
              <shadow id="glidey" type="math_number">
                <field name="NUM">0</field>
              </shadow>
            </value>
          </block>
          ${blockSeparator}
          <block type="motion_pointindirection">
            <value name="DIRECTION">
              <shadow type="math_angle">
                <field name="NUM">90</field>
              </shadow>
            </value>
          </block>
          <block type="motion_pointtowards">
            <value name="TOWARDS">
              <shadow type="motion_pointtowards_menu" />
            </value>
          </block>
          ${blockSeparator}
          <block type="motion_changexby">
            <value name="DX">
              <shadow type="math_number">
                <field name="NUM">10</field>
              </shadow>
            </value>
          </block>
          <block type="motion_setx">
            <value name="X">
              <shadow id="setx" type="math_number">
                <field name="NUM">0</field>
              </shadow>
            </value>
          </block>
          <block type="motion_changeyby">
            <value name="DY">
              <shadow type="math_number">
                <field name="NUM">10</field>
              </shadow>
            </value>
          </block>
          <block type="motion_sety">
            <value name="Y">
              <shadow id="sety" type="math_number">
                <field name="NUM">0</field>
              </shadow>
            </value>
          </block>
          ${blockSeparator}
          <block type="motion_ifonedgebounce"/>
          ${blockSeparator}
          <block type="motion_setrotationstyle"/>
          ${blockSeparator}
          <block id="${targetId}_xposition" type="motion_xposition"/>
          <block id="${targetId}_yposition" type="motion_yposition"/>
          <block id="${targetId}_direction" type="motion_direction"/>
          ${categorySeparator}
          `
    }
  </category>
`;

const looks = (isStage, targetId, costumeName, backdropName) => `
  <category name="%{BKY_CATEGORY_LOOKS}" id="looks" colour="#9966FF" secondaryColour="#774DCB">
    ${
      isStage
        ? `
          <block type="looks_switchbackdropto">
            <value name="BACKDROP">
              <shadow type="looks_backdrops">
                <field name="BACKDROP">${backdropName}</field>
              </shadow>
            </value>
          </block>
          <block type="looks_switchbackdroptoandwait">
            <value name="BACKDROP">
              <shadow type="looks_backdrops">
                <field name="BACKDROP">${backdropName}</field>
              </shadow>
            </value>
          </block>
          <block type="looks_nextbackdrop"/>
          `
        : `
          <block type="looks_sayforsecs">
            <value name="MESSAGE">
              <shadow type="text">
                <field name="TEXT">${ScratchBlocks.Msg.LOOKS_HELLO}</field>
              </shadow>
            </value>
            <value name="SECS">
              <shadow type="math_number">
                <field name="NUM">2</field>
              </shadow>
            </value>
          </block>
          <block type="looks_say">
            <value name="MESSAGE">
              <shadow type="text">
                <field name="TEXT">${ScratchBlocks.Msg.LOOKS_HELLO}</field>
              </shadow>
            </value>
          </block>
          <block type="looks_thinkforsecs">
            <value name="MESSAGE">
              <shadow type="text">
                <field name="TEXT">${ScratchBlocks.Msg.LOOKS_HMM}</field>
              </shadow>
            </value>
            <value name="SECS">
              <shadow type="math_number">
                <field name="NUM">2</field>
              </shadow>
            </value>
          </block>
          <block type="looks_think">
            <value name="MESSAGE">
              <shadow type="text">
                <field name="TEXT">${ScratchBlocks.Msg.LOOKS_HMM}</field>
              </shadow>
            </value>
          </block>
          ${blockSeparator}
          <block id="${targetId}_switchcostumeto" type="looks_switchcostumeto">
            <value name="COSTUME">
              <shadow type="looks_costume">
                <field name="COSTUME">${costumeName}</field>
              </shadow>
            </value>
          </block>
          <block type="looks_nextcostume"/>
          <block type="looks_switchbackdropto">
            <value name="BACKDROP">
              <shadow type="looks_backdrops">
                <field name="BACKDROP">${backdropName}</field>
              </shadow>
            </value>
          </block>
          <block type="looks_nextbackdrop"/>
          ${blockSeparator}
          <block type="looks_changesizeby">
            <value name="CHANGE">
              <shadow type="math_number">
                <field name="NUM">10</field>
              </shadow>
            </value>
          </block>
          <block type="looks_setsizeto">
            <value name="SIZE">
              <shadow type="math_number">
                <field name="NUM">100</field>
              </shadow>
            </value>
          </block>
          `
    }
    ${blockSeparator}
    ${
      false
        ? `
        <block type="looks_changeeffectby">
          <value name="CHANGE">
            <shadow type="math_number">
              <field name="NUM">25</field>
            </shadow>
          </value>
        </block>
        <block type="looks_seteffectto">
          <value name="VALUE">
            <shadow type="math_number">
              <field name="NUM">0</field>
            </shadow>
          </value>
        </block>
        <block type="looks_cleargraphiceffects"/>
        ${blockSeparator}
        `
        : ''
    }
    ${
      isStage
        ? ''
        : `
          <block type="looks_show"/>
          <block type="looks_hide"/>
          ${blockSeparator}
          <block type="looks_gotofrontback"/>
          <block type="looks_goforwardbackwardlayers">
            <value name="NUM">
              <shadow type="math_integer">
                <field name="NUM">1</field>
              </shadow>
            </value>
          </block>
          `
    }
    ${
      isStage
        ? `
          <block id="backdropnumbername" type="looks_backdropnumbername"/>
          `
        : `
          <block id="${targetId}_costumenumbername" type="looks_costumenumbername"/>
          <block id="backdropnumbername" type="looks_backdropnumbername"/>
          <block id="${targetId}_size" type="looks_size"/>
          `
    }
    ${categorySeparator}
  </category>
`;

const sound = (soundName) => `
  <category name="%{BKY_CATEGORY_SOUND}" id="sound" colour="#D65CD6" secondaryColour="#BD42BD">
    <block type="sound_playuntildone">
      <value name="SOUND_MENU">
        <shadow type="sound_sounds_menu">
          <field name="SOUND_MENU">${soundName}</field>
        </shadow>
      </value>
    </block>
    <block type="sound_play">
      <value name="SOUND_MENU">
        <shadow type="sound_sounds_menu">
          <field name="SOUND_MENU">${soundName}</field>
        </shadow>
      </value>
    </block>
    <block type="sound_stopallsounds"/>
    ${categorySeparator}
  </category>
`;

const events = () => `
  <category name="%{BKY_CATEGORY_EVENTS}" id="events" colour="#FFD500" secondaryColour="#CC9900">
    <block type="event_whenflagclicked"/>
    <block type="event_whenkeypressed"/>
    <block type="event_whenbackdropswitchesto"/>
    ${blockSeparator}
    <block type="event_whengreaterthan">
      <value name="VALUE">
        <shadow type="math_number">
          <field name="NUM">10</field>
        </shadow>
      </value>
    </block>
    ${blockSeparator}
    <block type="event_whenbroadcastreceived" />
    <block type="event_broadcast">
      <value name="BROADCAST_INPUT">
        <shadow type="event_broadcast_menu"></shadow>
      </value>
    </block>
    <block type="event_broadcastandwait">
      <value name="BROADCAST_INPUT">
        <shadow type="event_broadcast_menu"></shadow>
      </value>
    </block>
    ${categorySeparator}
  </category>
`;

const control = (isStage) => `
  <category name="%{BKY_CATEGORY_CONTROL}" id="control" colour="#FFAB19" secondaryColour="#CF8B17">
    <block type="control_wait">
      <value name="DURATION">
        <shadow type="math_positive_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
    </block>
    ${blockSeparator}
    <block type="control_repeat">
      <value name="TIMES">
        <shadow type="math_whole_number">
          <field name="NUM">10</field>
        </shadow>
      </value>
    </block>
    <block id="forever" type="control_forever"/>
    ${blockSeparator}
    <block type="control_if"/>
    <block type="control_if_else"/>
    <block id="wait_until" type="control_wait_until"/>
    <block id="repeat_until" type="control_repeat_until"/>
    <block type="control_while"/>
    ${blockSeparator}
    <block type="control_stop"/>
    ${blockSeparator}
    ${
      isStage
        ? `
          <block type="control_create_clone_of">
            <value name="CLONE_OPTION">
              <shadow type="control_create_clone_of_menu"/>
            </value>
          </block>
          `
        : `
          <block type="control_start_as_clone"/>
          <block type="control_create_clone_of">
            <value name="CLONE_OPTION">
              <shadow type="control_create_clone_of_menu"/>
            </value>
          </block>
          <block type="control_delete_this_clone"/>
          `
    }
    ${categorySeparator}
  </category>
`;

const sensing = (isStage) => `
  <category name="%{BKY_CATEGORY_SENSING}" id="sensing" colour="#4CBFE6" secondaryColour="#2E8EB8">
    ${
      isStage
        ? ''
        : `
        <block type="sensing_touchingobject">
          <value name="TOUCHINGOBJECTMENU">
            <shadow type="sensing_touchingobjectmenu"/>
          </value>
        </block>
        <block type="sensing_distanceto">
          <value name="DISTANCETOMENU">
            <shadow type="sensing_distancetomenu"/>
          </value>
        </block>
        ${blockSeparator}
        `
    }
    <block type="sensing_keypressed">
      <value name="KEY_OPTION">
        <shadow type="sensing_keyoptions"/>
      </value>
    </block>
    ${blockSeparator}
    <block id="timer" type="sensing_timer"/>
    <block type="sensing_resettimer"/>
    ${blockSeparator}
    <block id="of" type="sensing_of">
      <value name="OBJECT">
        <shadow id="sensing_of_object_menu" type="sensing_of_object_menu"/>
      </value>
    </block>
    ${categorySeparator}
  </category>
`;

export default function (isStage, targetId, costumeName = '', backdropName = '', soundName = '') {
  costumeName = xmlEscape(costumeName);
  backdropName = xmlEscape(backdropName);
  soundName = xmlEscape(soundName);
  return makeToolboxXML([
    {
      id: 'motion',
      xml: motion(isStage, targetId),
    },
    {
      id: 'looks',
      xml: looks(isStage, targetId, costumeName, backdropName),
    },
    {
      id: 'sound',
      xml: sound(soundName),
    },
    {
      id: 'events',
      xml: events(),
    },
    {
      id: 'control',
      xml: control(isStage),
    },
    {
      id: 'sensing',
      xml: sensing(isStage),
    },
  ]);
}

import { ScratchBlocks } from '@blockcode/blocks-editor';

ScratchBlocks.Blocks['event_whenflagclicked'] = {
  init() {
    this.jsonInit({
      id: 'event_whenflagclicked',
      message0: ScratchBlocks.Msg.EVENT_WHENFLAGCLICKED,
      args0: [
        {
          type: 'field_image',
          src: ScratchBlocks.mainWorkspace.options.pathToMedia + 'green-flag.svg',
          width: 24,
          height: 24,
          alt: 'flag',
        },
      ],
      category: ScratchBlocks.Categories.event,
      extensions: ['colours_event', 'shape_hat'],
    });
  },
};

ScratchBlocks.Blocks['event_whenkeypressed'] = {
  init() {
    this.jsonInit({
      id: 'event_whenkeypressed',
      message0: ScratchBlocks.Msg.EVENT_WHENKEYPRESSED,
      args0: [
        {
          type: 'field_dropdown',
          name: 'KEY_OPTION',
          options: [
            [ScratchBlocks.Msg.EVENT_WHENKEYPRESSED_CENTER, 'center'],
            [ScratchBlocks.Msg.EVENT_WHENKEYPRESSED_UP, 'up'],
            [ScratchBlocks.Msg.EVENT_WHENKEYPRESSED_DOWN, 'down'],
            [ScratchBlocks.Msg.EVENT_WHENKEYPRESSED_LEFT, 'left'],
            [ScratchBlocks.Msg.EVENT_WHENKEYPRESSED_RIGHT, 'right'],
            [ScratchBlocks.Msg.EVENT_WHENKEYPRESSED_ANY, 'any'],
          ],
        },
      ],
      category: ScratchBlocks.Categories.event,
      extensions: ['colours_event', 'shape_hat'],
    });
  },
};

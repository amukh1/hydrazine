export default {
  $CONFIGS: {
    $verbose: true,
    $logs: {
      err: '../logs/err.log',
      warn: '../logs/warn.log',
    },
  },
  $ENV: {
    key: 'value',
  },
  $GLOBAL: {
    $PREFIX: 'h!',
    $PRESENCE: {
      name: 'Created With Hydrazine.',
      type: 'WATCHING',
    },
  },
  $cinfo: {
    /**
     * @param {$MSGCONTENT} - Contents of the message sent by a user.
     **/
    $listeners: [
      {
        $checkpoints: [
          {
            $name: 'help',
            $type: 'text_command',
            $params: {},
            $conditions: {
              $equals: {
                $MSGCONTENT: 'help', // If The message is 'help'
              },
              $includes: {},
              $startsWith: {
                $MSGCONTENT: '$PREFIX',
              },
              $endsWith: {},
            },
          },
        ],
      },
    ],
  },
}

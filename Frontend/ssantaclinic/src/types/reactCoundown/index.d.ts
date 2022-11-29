declare module 'react-countdown' {
  import * as React from 'react';

  export interface RendererProps {
    completed: boolean;
    api: {
      start: () => void;
      pause: () => void;
      resume: () => void;
      restart: () => void;
    };
  }

  export interface Renderer {
    (props: RendererProps): React.ReactNode;
  }

  export interface Props {
    date: Date;
    daysInHours?: boolean;
    onMount?: () => void;
    onComplete?: () => void;
    renderer?: Renderer;
    children?: Renderer;
  }

  export default class Countdown extends React.Component<Props> {}
}

// @flow
import React, { Component } from 'react'
import { v4 } from 'uuid'
import Icon from 'material-ui/svg-icons/image/crop-landscape'
import TextField from 'material-ui/TextField'
import type {
  LayoutPluginProps,
  ContentPlugin
} from 'ory-editor-core/lib/service/plugin/classes'
import { BottomToolbar } from 'ory-editor-ui'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const handleChange = (onChange: (state: any) => void, key: string) => (
  e: Event,
  value: string
) => onChange({ [key]: value })

class PluginComponent extends Component {
  state = { hidden: false }
  props: LayoutPluginProps<{}> & { children: any }

  render() {
    const {
      children,
      focused,
      onChange,
      state: { background = '', darken = 0.3 }
    } = this.props
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div
          className="ory-plugins-layout-parallax-background"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, ${darken}), rgba(0, 0, 0, ${darken})), url('${background}')`
          }}
        >
          <BottomToolbar open={focused}>
            <TextField
              hintText="http://example.com/image.png"
              floatingLabelText="Image location (URL)"
              inputStyle={{ color: 'white' }}
              floatingLabelStyle={{ color: 'white' }}
              hintStyle={{ color: 'grey' }}
              style={{ width: '256px' }}
              value={background}
              onChange={handleChange(onChange, 'background')}
            />
            <TextField
              hintText="0.3"
              floatingLabelText="Darken level"
              inputStyle={{ color: 'white' }}
              floatingLabelStyle={{ color: 'white' }}
              hintStyle={{ color: 'grey' }}
              style={{ width: '256px' }}
              value={darken}
              onChange={handleChange(onChange, 'darken')}
            />
          </BottomToolbar>
          {children}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default ({ defaultPlugin }: { defaultPlugin: ContentPlugin }) => ({
  Component: PluginComponent,
  name: 'ory/editor/core/layout/parallax-background',
  version: '0.0.1',

  text: 'Parallax Background',
  IconComponent: <Icon />,

  createInitialChildren: () => ({
    id: v4(),
    rows: [
      {
        id: v4(),
        cells: [
          {
            content: {
              plugin: defaultPlugin,
              state: defaultPlugin.createInitialState()
            },
            id: v4()
          }
        ]
      }
    ]
  }),

  handleFocusNextHotKey: () => Promise.reject(),
  handleFocusPreviousHotKey: () => Promise.reject()
})

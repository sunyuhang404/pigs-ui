/**
 * 日期
 * type: 选择器类型
 * year: 年
 * month: 月
 * date: 年-月-日
 * time: 时:分:秒
 * datetime: 年-月-日 时:分:秒
 * 
 * format: 格式化
 * value: 初始值
 * 
 */
import Nerv from 'nervjs';
import './datepicker.less';

import laydate from '@/assets/laydate';
import '@/assets/laydate.css';

export default class DatePicker extends Nerv.Component {
  static defaultProps = {
    type: 'year',
    format: 'yyyy-MM-dd'
  };
  static datepicker = null;
  constructor(props) {
    super(props);
    this.state = {
      options: {
        elem: '.picker',
        type: this.props.type,
        format: this.props.format,
        value: this.props.value,
        isInitValue: true,
        change: (value, date) => this.handleDatepickerChange(value, date),
        done: (value, date) => this.handleDatepickerConfirm(value, date)
      }
    };
  }
  componentDidMount() {
    this.datepicker = laydate.render(this.state.options);
  }

  componentWillReceiveProps = (nextProps) => {
    const { type, format } = nextProps;
    let options = this.state.options;
    if (type) options.type = type;
    if (format) options.format = format;
    this.setState({ options }, () => {
      if (this.datepicker) {
        this.datepicker.config.type = this.state.options.type;
        this.datepicker.config.format = this.state.options.format;
        // laydate.render(this.state.options);
      }
    })
  }

  handleDatepickerChange = (value, date) => {
    // console.log(value);
    if (this.props.onChange) this.props.onChange(value);
  }

  handleDatepickerConfirm = (value, date) => {
    console.log(value);
    if (this.props.onConfirm) this.props.onConfirm(value);
  }
  
  render() {
    const { className } = this.props;
    let name = `date-picker ${className ? className : ''}`;
    return (
      <div className={name}>
        <input
          className="picker"
          type="text"
          placeholder="请输入生日"
          disabled={this.state.disabled}
        />
        <em className="icon"></em>
      </div>
    )
  }
}
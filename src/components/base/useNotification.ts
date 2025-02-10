import { notification } from 'ant-design-vue';
import type { NotificationPlacement } from 'ant-design-vue';

// 创建通知实例
const [api, contextHolder] = notification.useNotification();

// 定义通知函数
export function openNotify(
  placement: NotificationPlacement,
  msg: any,
  success?: boolean,
) {
  if (success) {
    api.success({
      message: '成功',
      description: `${msg}`,
      placement,
    });
  }
  else {
    api.error({
      message: '错误信息',
      description: `${msg}`,
      placement,
    });
  }
}

// 导出 contextHolder，以便在模板中使用
export { contextHolder };

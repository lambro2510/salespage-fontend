import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Breadcrumb, Spin } from 'antd';
import useBreakpoint from '../hooks/breakpoint';
import Loader from '../loader';
import type { BreadcrumbProps } from 'antd/es/breadcrumb/Breadcrumb';

export interface BasePageContainerProps {
  title?: string;
  subTitle?: string;
  breadcrumb?: Partial<BreadcrumbProps> | React.ReactElement<typeof Breadcrumb>;
  extra?: React.ReactNode;
  loading?: boolean;
  children: React.ReactNode;
  transparent?: boolean;
}
const BasePageContainer = (props: BasePageContainerProps) => {

  const isMobile = useBreakpoint();

  return (
    <div className='flex justify-center'>
      <PageContainer
        style={{width : '100%', borderRadius : 0}}
        header={{
          title: props.title,
          breadcrumb: CONFIG.theme.showBreadcrumb ? props.breadcrumb : undefined,
          extra: props.extra,
        }}
        childrenContentStyle={isMobile ? { paddingInline: 15 } : {}}
        subTitle={props.subTitle}
      >
        <ProCard
          className={`mb-10 ${!props.transparent ? 'shadow-lg' : ''}`}
          size="small"
          style={{ minHeight: 100 }}
          ghost={props.transparent}
          loading={
            props.loading ? (
              <Loader text={'Đang tải'} spinner={<Spin size="large" />} />
            ) : (
              false
            )
          }
        >
          {props.children}
        </ProCard>
      </PageContainer>
    </div>
  );
};

export default BasePageContainer;

import {Link, Outlet} from "react-router";
import {Layout, theme, Row, Col} from "antd";
import {UserHeader} from "@/components/ui";
import {useAuthStore} from "@/stores";

const {Header, Content, Footer} = Layout;

export function MainLayout() {
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();
  const {isAuthenticated} = useAuthStore();

  return (
    <Layout
      style={{
        minHeight: "100svh",
      }}
    >
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: colorBgContainer,
          padding: "0 24px",
        }}
      >
        <Link to="">LexusLabs</Link>
        <UserHeader />
      </Header>
      <Content>
        <div
          style={{
            background: colorBgContainer,
            padding: 24,
            borderRadius: borderRadiusLG,
            height: "auto",
          }}
        >
          <Outlet />
        </div>
      </Content>

      <Footer style={{textAlign: "center"}}>
        <Row justify="center">
          <Col xs={0} sm={24}>
            Labs ©2026 Created by L
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
}

import { useAuth } from "@/contexts/AuthContext";
import EscalationCenter from "@/pages/dashboard/EscalationCenter";
import MemberEscalationCenter from "@/pages/dashboard/MemberEscalationCenter";

export default function ConditionalEscalationCenter() {
  const { user } = useAuth();
  
  // Show member escalation center for organization members
  if (user?.role === 'organization-member') {
    return <MemberEscalationCenter />;
  }
  
  // Show admin escalation center for organization admins and others
  return <EscalationCenter />;
}
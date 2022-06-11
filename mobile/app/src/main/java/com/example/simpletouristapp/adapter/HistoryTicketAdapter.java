package com.example.simpletouristapp.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.simpletouristapp.R;
import com.example.simpletouristapp.model.HistoryTicketResponse;

import java.text.NumberFormat;
import java.util.List;
import java.util.Locale;

public class HistoryTicketAdapter extends RecyclerView.Adapter<HistoryTicketAdapter.HistoryTicketViewHolder>{
    private Context context;
    private List<HistoryTicketResponse.TicketHistory> tickets;

    public HistoryTicketAdapter(Context context, List<HistoryTicketResponse.TicketHistory> tickets) {
        this.context = context;
        this.tickets = tickets;
    }

    @NonNull
    @Override
    public HistoryTicketViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        View view = inflater.inflate(R.layout.item_history, parent, false);
        return new HistoryTicketViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull HistoryTicketViewHolder holder, int position) {
        HistoryTicketResponse.TicketHistory ticket = tickets.get(position);

        Locale lc = new Locale("nv","VN");
        NumberFormat nf = NumberFormat.getCurrencyInstance(lc);

        holder.nameTour.setText(ticket.getTourName());
        holder.price.setText(nf.format(ticket.getPaymentPrice()));
        if(ticket.getStatus() == 1){
            holder.state.setText("Đã thanh toán");
        }else {
            holder.state.setText("Chưa thanh toán");
        }
    }

    @Override
    public int getItemCount() {
        return tickets.size();
    }

    public class HistoryTicketViewHolder extends RecyclerView.ViewHolder{
        private TextView nameTour;
        private TextView price;
        private Button btnRate;
        private TextView state;
        public HistoryTicketViewHolder(@NonNull View itemView) {
            super(itemView);
            nameTour = itemView.findViewById(R.id.tv_name_tour_history);
            price = itemView.findViewById(R.id.tv_price_history);
            btnRate = itemView.findViewById(R.id.btn_rate_history);
            state = itemView.findViewById(R.id.tv_state);
        }
    }
}

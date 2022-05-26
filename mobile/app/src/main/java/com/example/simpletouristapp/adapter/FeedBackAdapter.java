package com.example.simpletouristapp.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RatingBar;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.simpletouristapp.R;
import com.example.simpletouristapp.model.FeedBackResponse;

import java.util.List;

public class FeedBackAdapter extends RecyclerView.Adapter<FeedBackAdapter.FeedBackViewHolder> {

    private Context context;
    private List<FeedBackResponse.FeedBack> feedBacks;

    public FeedBackAdapter(Context context, List<FeedBackResponse.FeedBack> feedBacks) {
        this.context = context;
        this.feedBacks = feedBacks;
    }

    public Context getContext() {
        return context;
    }

    public void setContext(Context context) {
        this.context = context;
    }

    public List<FeedBackResponse.FeedBack> getFeedBacks() {
        return feedBacks;
    }

    public void setFeedBacks(List<FeedBackResponse.FeedBack> feedBacks) {
        this.feedBacks = feedBacks;
    }

    @NonNull
    @Override
    public FeedBackViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        View view = inflater.inflate(R.layout.item_comment, parent, false);
        return new FeedBackViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull FeedBackViewHolder holder, int position) {
        FeedBackResponse.FeedBack feedBack = feedBacks.get(position);

        holder.tvName.setText(feedBack.getCustomer().getName());
        holder.rating.setRating(feedBack.getRating());
        holder.comment.setText(feedBack.getComment());
    }

    @Override
    public int getItemCount() {
        return feedBacks.size();
    }

    public class FeedBackViewHolder extends RecyclerView.ViewHolder{
        private TextView tvName;
        private RatingBar rating;
        private TextView comment;
        public FeedBackViewHolder(@NonNull View itemView) {
            super(itemView);
            tvName = itemView.findViewById(R.id.txt_email_account);
            rating = itemView.findViewById(R.id.rating_feedback);
            comment = itemView.findViewById(R.id.txt_cmt_account);
        }
    }
}
